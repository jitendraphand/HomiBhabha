/**
 * =====================================================================
 * Homi Bhabha Balvaidnyanik — Practice Test results collector
 * ---------------------------------------------------------------------
 * Paste this whole file into a Google Apps Script project that is bound
 * to a Google Sheet (Extensions > Apps Script from inside the Sheet),
 * then deploy it as a Web App. Full step-by-step instructions are in
 * apps-script/README.md.
 *
 * Endpoints
 *   POST  {type:"result", ...}          append one finished attempt
 *   GET   ?action=ping                  health check, no key needed
 *   GET   ?action=results&key=ADMIN_KEY all result rows
 *   GET   ?action=responses&key=...     per-question rows (optionally
 *                                       &attemptId= to filter)
 *   GET   ?action=analysis&key=...      per-question difficulty analysis
 * =====================================================================
 */

var SHEET_RESULTS   = 'Results';
var SHEET_RESPONSES = 'Responses';

var RESULT_HEADERS = [
  'Recorded At', 'Attempt ID', 'Test ID', 'Test Name',
  'First Name', 'Last Name', 'Full Name', 'Roll No', 'Division', 'School',
  'Score', 'Out Of', 'Percent', 'Correct', 'Wrong', 'Not Attempted',
  'Accuracy %', 'Time Taken (s)', 'Time Taken', 'Started At', 'Finished At',
  'Auto Submitted', 'Tab Switches', 'Device', 'Topic Breakdown'
];

var RESPONSE_HEADERS = [
  'Recorded At', 'Attempt ID', 'Roll No', 'Division', 'Full Name',
  'Q No', 'Question ID', 'Topic', 'Difficulty',
  'Chosen', 'Chosen Text', 'Correct', 'Correct Text', 'Is Correct', 'Marked'
];

/* ------------------------------------------------------------- utils */

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function book() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sheetFor(name, headers) {
  var ss = book();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#e7ecfd');
    sh.setFrozenRows(1);
  }
  return sh;
}

function adminKey() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_KEY') || '';
}

function checkKey(given) {
  var expected = adminKey();
  if (!expected) throw new Error('ADMIN_KEY is not set in Script Properties.');
  if (String(given || '') !== expected) throw new Error('Wrong teacher passcode.');
}

function humanTime(seconds) {
  seconds = Math.max(0, Math.round(Number(seconds) || 0));
  var m = Math.floor(seconds / 60), s = seconds % 60;
  return m + ' min ' + s + ' s';
}

function topicSummary(topics) {
  if (!topics) return '';
  return Object.keys(topics).map(function (name) {
    return name + ': ' + topics[name].correct + '/' + topics[name].total;
  }).join(' | ');
}

/** Has this attempt already been written? Keeps retries from duplicating. */
function attemptExists(sheet, attemptId) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var ids = sheet.getRange(2, 2, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(attemptId)) return true;
  }
  return false;
}

/* -------------------------------------------------------------- POST */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);

    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'Empty request body.' });
    }

    var data = JSON.parse(e.postData.contents);

    if (data.type !== 'result') {
      return jsonOut({ ok: false, error: 'Unknown payload type: ' + data.type });
    }
    if (!data.attemptId) {
      return jsonOut({ ok: false, error: 'Missing attemptId.' });
    }

    var results = sheetFor(SHEET_RESULTS, RESULT_HEADERS);

    // Idempotent: a queued retry after a successful write must not duplicate.
    if (attemptExists(results, data.attemptId)) {
      return jsonOut({ ok: true, duplicate: true, attemptId: data.attemptId });
    }

    var now = new Date();
    var fullName = (data.firstName || '') + ' ' + (data.lastName || '');

    results.appendRow([
      now,
      data.attemptId,
      data.testId || '',
      data.testName || '',
      data.firstName || '',
      data.lastName || '',
      fullName.trim(),
      "'" + String(data.rollNo || ''),   // leading quote keeps "007" intact
      data.division || '',
      data.school || '',
      Number(data.score) || 0,
      Number(data.total) || 0,
      Number(data.percent) || 0,
      Number(data.correct) || 0,
      Number(data.wrong) || 0,
      Number(data.skipped) || 0,
      Number(data.accuracy) || 0,
      Number(data.timeTakenSeconds) || 0,
      humanTime(data.timeTakenSeconds),
      data.startedAt || '',
      data.finishedAt || '',
      data.autoSubmitted ? 'Yes' : 'No',
      Number(data.tabSwitches) || 0,
      data.device || '',
      topicSummary(data.topics)
    ]);

    // Per-question detail, written in one block for speed.
    if (data.responses && data.responses.length) {
      var responses = sheetFor(SHEET_RESPONSES, RESPONSE_HEADERS);
      var rows = data.responses.map(function (r) {
        return [
          now,
          data.attemptId,
          "'" + String(data.rollNo || ''),
          data.division || '',
          fullName.trim(),
          Number(r.n) || 0,
          r.qid || '',
          r.topic || '',
          r.difficulty || '',
          r.chosen || '',
          r.chosenText || '',
          r.correct || '',
          r.correctText || '',
          r.isCorrect ? 'Yes' : (r.chosen ? 'No' : ''),
          r.marked ? 'Yes' : ''
        ];
      });
      responses
        .getRange(responses.getLastRow() + 1, 1, rows.length, RESPONSE_HEADERS.length)
        .setValues(rows);
    }

    return jsonOut({ ok: true, attemptId: data.attemptId });

  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/* --------------------------------------------------------------- GET */

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    var action = p.action || 'ping';

    if (action === 'ping') {
      return jsonOut({ ok: true, service: 'homi-bhabha-practice', keySet: !!adminKey() });
    }

    checkKey(p.key);

    if (action === 'results') {
      return jsonOut({ ok: true, rows: readSheet(SHEET_RESULTS, RESULT_HEADERS) });
    }

    if (action === 'responses') {
      var rows = readSheet(SHEET_RESPONSES, RESPONSE_HEADERS);
      if (p.attemptId) {
        rows = rows.filter(function (r) { return String(r['Attempt ID']) === String(p.attemptId); });
      }
      return jsonOut({ ok: true, rows: rows });
    }

    if (action === 'analysis') {
      return jsonOut({ ok: true, questions: analyseQuestions() });
    }

    return jsonOut({ ok: false, error: 'Unknown action: ' + action });

  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message || err) });
  }
}

function readSheet(name, headers) {
  var sh = book().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  var values = sh.getRange(1, 1, sh.getLastRow(), headers.length).getValues();
  var head = values.shift();
  return values.map(function (row) {
    var obj = {};
    head.forEach(function (key, i) {
      var v = row[i];
      obj[key] = (v instanceof Date) ? v.toISOString() : v;
    });
    return obj;
  });
}

/** Which questions is the class getting wrong most often? */
function analyseQuestions() {
  var sh = book().getSheetByName(SHEET_RESPONSES);
  if (!sh || sh.getLastRow() < 2) return [];
  var values = sh.getRange(2, 1, sh.getLastRow() - 1, RESPONSE_HEADERS.length).getValues();

  var byQ = {};
  values.forEach(function (row) {
    var qid = row[6], topic = row[7], isCorrect = row[13];
    if (!qid) return;
    if (!byQ[qid]) byQ[qid] = { qid: qid, topic: topic, attempts: 0, correct: 0, skipped: 0 };
    byQ[qid].attempts++;
    if (isCorrect === 'Yes') byQ[qid].correct++;
    else if (isCorrect === '') byQ[qid].skipped++;
  });

  return Object.keys(byQ).map(function (k) {
    var q = byQ[k];
    q.percentCorrect = q.attempts ? Math.round(q.correct / q.attempts * 1000) / 10 : 0;
    return q;
  }).sort(function (a, b) { return a.percentCorrect - b.percentCorrect; });
}

/* -------------------------------------------------------- setup help */

/**
 * Run this ONCE from the Apps Script editor (select setUp, press Run).
 * It creates both sheets with their headers and generates a random
 * teacher passcode if one has not been set yet. The passcode is printed
 * in the execution log — copy it and keep it safe.
 */
function setUp() {
  sheetFor(SHEET_RESULTS, RESULT_HEADERS);
  sheetFor(SHEET_RESPONSES, RESPONSE_HEADERS);

  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('ADMIN_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
    props.setProperty('ADMIN_KEY', key);
  }
  Logger.log('Sheets are ready.');
  Logger.log('TEACHER PASSCODE (ADMIN_KEY): ' + key);
  return key;
}

/** Set your own passcode instead of the generated one. */
function setPasscode(newKey) {
  if (!newKey || String(newKey).length < 6) {
    throw new Error('Choose a passcode of at least 6 characters.');
  }
  PropertiesService.getScriptProperties().setProperty('ADMIN_KEY', String(newKey));
  Logger.log('Passcode updated.');
}
