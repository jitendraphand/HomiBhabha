/* =====================================================================
   exam.js — runs the paper, then scores it and draws the report.
   ===================================================================== */
(function () {
  "use strict";

  var TEST = window.TEST_SOUND;
  var CFG  = window.APP_CONFIG || {};
  var LETTERS = ["A", "B", "C", "D"];

  var A = HB.read(HB.KEY.ATTEMPT, null);

  if (!A || A.testId !== TEST.id) {
    location.replace("index.html");
    return;
  }

  var total = TEST.questions.length;
  var pos = Math.min(A.current || 0, total - 1);
  var ticker = null;
  var finished = false;

  var $ = function (id) { return document.getElementById(id); };

  /* ------------------------------------------------------------ save */
  function save() {
    A.current = pos;
    HB.write(HB.KEY.ATTEMPT, A);
  }

  /* --------------------------------------------- question accessors */
  function qIndexAt(p) { return A.order[p]; }
  function questionAt(p) { return TEST.questions[qIndexAt(p)]; }

  /** Original option indices in the order this student sees them. */
  function displayOrder(qi) {
    return (A.optionOrder && A.optionOrder[qi]) ||
           TEST.questions[qi].options.map(function (_, k) { return k; });
  }

  /* =============================================== ALREADY SUBMITTED */
  if (A.submitted && A.result) {
    showResult(A.result);
    return;
  }

  /* ==================================================== EXAM RUNNING */

  $("barName").textContent = A.student.firstName + " " + A.student.lastName;
  $("barMeta").textContent = "Roll " + A.student.rollNo + " · Div " + A.student.division +
                             " · " + TEST.name;

  /* ------------------------------------------------------- rendering */
  function render() {
    var qi = qIndexAt(pos);
    var q = TEST.questions[qi];
    A.visited[qi] = true;

    $("qNum").textContent = "Question " + (pos + 1) + " of " + total;
    $("qMarkedChip").hidden = !A.marked[qi];
    $("qText").textContent = q.q;

    var chosen = A.answers[qi];
    var box = $("options");
    box.innerHTML = "";

    displayOrder(qi).forEach(function (originalIdx, slot) {
      var label = document.createElement("label");
      label.className = "opt" + (chosen === originalIdx ? " selected" : "");
      label.innerHTML =
        '<span class="key">' + LETTERS[slot] + '</span>' +
        '<span class="lbl"></span>';
      label.querySelector(".lbl").textContent = q.options[originalIdx];

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "opt";
      radio.checked = chosen === originalIdx;
      label.insertBefore(radio, label.firstChild);

      label.addEventListener("click", function (e) {
        e.preventDefault();
        choose(originalIdx);
      });
      box.appendChild(label);
    });

    $("markBtn").textContent = A.marked[qi] ? "Unmark review" : "Mark for review";
    $("prevBtn").disabled = pos === 0;
    $("nextBtn").textContent = pos === total - 1 ? "Go to first unanswered" : "Next →";

    paintPalette();
    updateCounts();
    save();
  }

  function choose(originalIdx) {
    var qi = qIndexAt(pos);
    A.answers[qi] = originalIdx;
    save();
    render();
    // Small courtesy: move on automatically only if the student is going
    // forward through unseen questions is NOT assumed — keep them in place
    // so they can change their mind. Navigation stays explicit.
  }

  function paintPalette() {
    var grid = $("palette");
    if (grid.childElementCount !== total) {
      grid.innerHTML = "";
      for (var p = 0; p < total; p++) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pal";
        b.textContent = p + 1;
        b.setAttribute("aria-label", "Go to question " + (p + 1));
        (function (target) {
          b.addEventListener("click", function () { pos = target; render(); });
        })(p);
        grid.appendChild(b);
      }
    }
    for (var i = 0; i < total; i++) {
      var qi = A.order[i];
      var cell = grid.children[i];
      cell.className = "pal" +
        (A.answers[qi] !== undefined ? " answered" : "") +
        (A.marked[qi] ? " marked" : "") +
        (i === pos ? " current" : "");
    }
  }

  function answeredCount() {
    return Object.keys(A.answers).length;
  }

  function updateCounts() {
    var done = answeredCount();
    $("cAnswered").textContent = done;
    $("cLeft").textContent = total - done;
    $("progressBar").style.width = (done / total * 100).toFixed(1) + "%";
  }

  /* ------------------------------------------------------ navigation */
  function go(delta) {
    var next = pos + delta;
    if (next < 0) return;
    if (next >= total) { jumpToFirstUnanswered(); return; }
    pos = next;
    render();
  }

  function jumpToFirstUnanswered() {
    for (var p = 0; p < total; p++) {
      if (A.answers[A.order[p]] === undefined) {
        pos = p; render();
        HB.toast("Jumped to question " + (p + 1) + ", the first one still blank.");
        return;
      }
    }
    HB.toast("Every question is answered. You can submit now.");
  }

  $("prevBtn").addEventListener("click", function () { go(-1); });
  $("nextBtn").addEventListener("click", function () { go(1); });

  $("clearBtn").addEventListener("click", function () {
    delete A.answers[qIndexAt(pos)];
    save(); render();
  });

  $("markBtn").addEventListener("click", function () {
    var qi = qIndexAt(pos);
    if (A.marked[qi]) delete A.marked[qi]; else A.marked[qi] = true;
    save(); render();
  });

  /* -------------------------------------------------------- keyboard */
  document.addEventListener("keydown", function (e) {
    if (finished) return;
    if (/^(INPUT|SELECT|TEXTAREA)$/.test((e.target.tagName || ""))) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    var k = e.key.toUpperCase();
    var slot = LETTERS.indexOf(k);
    if (slot === -1 && /^[1-4]$/.test(k)) slot = parseInt(k, 10) - 1;

    if (slot > -1) {
      e.preventDefault();
      choose(displayOrder(qIndexAt(pos))[slot]);
    } else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft")    { e.preventDefault(); go(-1); }
    else if (k === "M")                { e.preventDefault(); $("markBtn").click(); }
  });

  /* ----------------------------------------------------------- timer */
  function secondsLeft() {
    return A.durationSeconds - (Date.now() - A.startedAt) / 1000;
  }

  function tick() {
    var left = secondsLeft();
    if (left <= 0) {
      $("timerText").textContent = "00:00";
      clearInterval(ticker);
      submit(true);
      return;
    }
    $("timerText").textContent = HB.clock(left);
    var box = $("timer");
    var mins = left / 60;
    box.classList.toggle("warn", mins <= (CFG.WARN_AT_MINUTES || 10) && mins > (CFG.DANGER_AT_MINUTES || 5));
    box.classList.toggle("danger", mins <= (CFG.DANGER_AT_MINUTES || 5));

    if (!tick.warned && mins <= (CFG.WARN_AT_MINUTES || 10)) {
      tick.warned = true;
      HB.toast(Math.ceil(mins) + " minutes left.", 4000);
    }
  }

  /* --------------------------------------------- duplicate exam tabs
     Each tab keeps the whole attempt in memory and writes the lot back on
     every change, so two tabs open on the same paper would quietly
     overwrite each other's answers. We cannot merge them sensibly, but we
     can make sure the student knows before they lose work.               */
  var TAB_TOKEN = HB.uid();
  var warnedDuplicate = false;
  A.liveTab = TAB_TOKEN;
  save();

  window.addEventListener("storage", function (e) {
    if (finished || warnedDuplicate) return;
    if (e.key !== HB.KEY.ATTEMPT || !e.newValue) return;
    var other;
    try { other = JSON.parse(e.newValue); } catch (_) { return; }
    if (!other || !other.liveTab || other.liveTab === TAB_TOKEN) return;

    warnedDuplicate = true;
    HB.toast("This paper is open in another tab or window. Close the other one — " +
             "answering in two places at once will lose answers.", 12000);
  });

  /* ------------------------------------------------- tab switch log */
  if (CFG.RECORD_TAB_SWITCHES !== false) {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && !finished) {
        A.tabSwitches = (A.tabSwitches || 0) + 1;
        save();
      }
    });
  }

  window.addEventListener("beforeunload", function (e) {
    if (finished) return;
    e.preventDefault();
    e.returnValue = "";
  });

  /* ---------------------------------------------------- submit modal */
  var modal = $("submitModal");

  $("submitBtn").addEventListener("click", function () {
    var done = answeredCount();
    var blank = total - done;
    var markedCount = Object.keys(A.marked).length;

    $("smBody").innerHTML =
      "<p>You have answered <strong>" + done + "</strong> of " + total + " questions." +
      (blank ? " <strong>" + blank + "</strong> are still blank." : "") +
      (markedCount ? " " + markedCount + " marked for review." : "") + "</p>" +
      (blank
        ? "<div class='note note-warn'><p class='mb0'>There is <strong>no negative marking</strong>. " +
          "A guess costs you nothing, so it is better to attempt every question.</p></div>"
        : "<div class='note note-ok'><p class='mb0'>Every question is answered. Well done.</p></div>") +
      "<p class='small muted mt mb0'>Time left: " + HB.clock(secondsLeft()) + "</p>";

    modal.classList.add("open");
    $("smCancel").focus();
  });

  $("smCancel").addEventListener("click", function () { modal.classList.remove("open"); });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("open");
  });
  $("smConfirm").addEventListener("click", function () { submit(false); });

  /* ---------------------------------------------------------- submit */
  function submit(auto) {
    if (finished) return;
    finished = true;
    clearInterval(ticker);
    modal.classList.remove("open");

    var timeTaken = Math.min(
      A.durationSeconds,
      Math.round((Date.now() - A.startedAt) / 1000)
    );

    var correct = 0, wrong = 0, skipped = 0;
    var topics = {};
    var responses = [];

    A.order.forEach(function (qi, p) {
      var q = TEST.questions[qi];
      var chosen = A.answers[qi];
      var isCorrect = chosen === q.answer;
      var attempted = chosen !== undefined;

      if (!attempted) skipped++;
      else if (isCorrect) correct++;
      else wrong++;

      if (!topics[q.topic]) topics[q.topic] = { correct: 0, total: 0 };
      topics[q.topic].total++;
      if (isCorrect) topics[q.topic].correct++;

      var shown = displayOrder(qi);
      responses.push({
        n: p + 1,
        qid: q.id,
        topic: q.topic,
        difficulty: q.difficulty,
        chosen: attempted ? LETTERS[shown.indexOf(chosen)] : "",
        chosenText: attempted ? q.options[chosen] : "",
        correct: LETTERS[shown.indexOf(q.answer)],
        correctText: q.options[q.answer],
        isCorrect: isCorrect,
        marked: !!A.marked[qi]
      });
    });

    var attempted = correct + wrong;
    var result = {
      attemptId: A.attemptId,
      testId: A.testId,
      testName: A.testName,
      student: A.student,
      school: A.school || "",
      startedAtISO: new Date(A.startedAt).toISOString(),
      finishedAtISO: new Date().toISOString(),
      finishedAt: HB.stamp(),
      timeTakenSeconds: timeTaken,
      autoSubmitted: !!auto,
      score: correct,
      total: total,
      percent: Math.round(correct / total * 1000) / 10,
      correct: correct,
      wrong: wrong,
      skipped: skipped,
      accuracy: attempted ? Math.round(correct / attempted * 1000) / 10 : 0,
      tabSwitches: A.tabSwitches || 0,
      device: A.device || HB.deviceLabel(),
      topics: topics,
      responses: responses
    };

    A.submitted = true;
    A.result = result;
    save();

    HB.historyAdd({
      finishedAt: result.finishedAt,
      testName: result.testName,
      score: result.score,
      total: result.total,
      percent: result.percent,
      timeTakenSeconds: result.timeTakenSeconds
    });

    showResult(result);

    if (auto) HB.toast("Time is up. Your paper was submitted automatically.", 5000);

    /* fire-and-forget upload; the report is already on screen */
    setSync("pending", "Saving…");
    HB.submitResult(buildPayload(result)).then(function (state) {
      if (state === "sent")            setSync("ok", "Result saved");
      else if (state === "queued")     setSync("fail", "Not sent — will retry");
      else                             setSync("", "Saved on this device");
    });
  }

  function buildPayload(r) {
    return {
      type: "result",
      attemptId: r.attemptId,
      testId: r.testId,
      testName: r.testName,
      firstName: r.student.firstName,
      lastName: r.student.lastName,
      rollNo: r.student.rollNo,
      division: r.student.division,
      school: r.school,
      startedAt: r.startedAtISO,
      finishedAt: r.finishedAtISO,
      timeTakenSeconds: r.timeTakenSeconds,
      autoSubmitted: r.autoSubmitted,
      score: r.score,
      total: r.total,
      percent: r.percent,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      accuracy: r.accuracy,
      tabSwitches: r.tabSwitches,
      device: r.device,
      topics: r.topics,
      responses: r.responses
    };
  }

  function setSync(cls, text) {
    var el = $("syncStatus");
    if (!el) return;
    el.className = "sync" + (cls ? " " + cls : "");
    el.textContent = text;
  }

  /* ================================================== RESULT SCREEN */
  function bandFor(percent) {
    if (percent >= 85) return { label: "Excellent", bg: "var(--ok-soft)", fg: "var(--ok)", ring: "var(--ok)" };
    if (percent >= 70) return { label: "Very good", bg: "var(--brand-soft)", fg: "var(--brand)", ring: "var(--brand)" };
    if (percent >= 55) return { label: "Good", bg: "var(--brand-soft)", fg: "var(--brand)", ring: "var(--brand)" };
    if (percent >= 40) return { label: "Fair — keep working", bg: "var(--warn-soft)", fg: "var(--warn)", ring: "var(--warn)" };
    return { label: "Needs more practice", bg: "var(--bad-soft)", fg: "var(--bad)", ring: "var(--bad)" };
  }

  function showResult(r) {
    finished = true;
    document.title = "Result — " + r.testName;
    $("examView").classList.add("hidden");
    $("resultView").classList.remove("hidden");
    window.scrollTo(0, 0);

    var band = bandFor(r.percent);

    $("scoreRing").style.background =
      "conic-gradient(" + band.ring + " " + (r.percent * 3.6) + "deg, var(--bg-subtle) 0deg)";
    $("scorePct").textContent = r.percent + "%";
    $("scoreRaw").textContent = r.score + " / " + r.total;

    var bandEl = $("scoreBand");
    bandEl.textContent = band.label;
    bandEl.style.background = band.bg;
    bandEl.style.color = band.fg;

    $("resultName").textContent = r.student.firstName + " " + r.student.lastName;
    $("resultMeta").textContent =
      "Roll " + r.student.rollNo + " · Division " + r.student.division +
      " · " + r.testName + " · " + r.finishedAt +
      (r.autoSubmitted ? " · submitted automatically when time ran out" : "");

    $("sCorrect").textContent  = r.correct;
    $("sWrong").textContent    = r.wrong;
    $("sSkipped").textContent  = r.skipped;
    $("sTime").textContent     = HB.humanDuration(r.timeTakenSeconds);
    $("sAccuracy").textContent = r.accuracy + "%";

    /* ---------------------------------------------------- topic bars */
    var rows = Object.keys(r.topics).map(function (name) {
      var t = r.topics[name];
      return { name: name, correct: t.correct, total: t.total, pct: t.correct / t.total * 100 };
    }).sort(function (a, b) { return a.pct - b.pct; });

    $("topicBars").innerHTML = rows.map(function (t) {
      var colour = t.pct >= 75 ? "var(--ok)" : t.pct >= 50 ? "var(--warn)" : "var(--bad)";
      return '<div class="tbar">' +
        '<div class="top"><b>' + HB.escapeHtml(t.name) + '</b>' +
        '<span>' + t.correct + " / " + t.total + "  ·  " + Math.round(t.pct) + '%</span></div>' +
        '<div class="track"><div class="fill" style="width:' + t.pct + '%;background:' + colour + '"></div></div>' +
        '</div>';
    }).join("");

    /* ------------------------------------------------------- advice */
    var weak = rows.filter(function (t) { return t.pct < 60; });
    var advice = "";
    if (r.skipped > 0) {
      advice += "<div class='note note-warn'><p class='mb0'>You left <strong>" + r.skipped +
        "</strong> question" + (r.skipped === 1 ? "" : "s") + " unanswered. There is no negative " +
        "marking in this competition, so an unanswered question is a mark thrown away. " +
        "Attempt every single one, even if you have to guess.</p></div>";
    }
    if (weak.length) {
      advice += "<div class='note note-bad'><p><strong>Revise these topics first:</strong></p><ul class='rules'>" +
        weak.map(function (t) {
          return "<li>" + HB.escapeHtml(t.name) + " — " + t.correct + " of " + t.total +
                 " correct (" + Math.round(t.pct) + "%)</li>";
        }).join("") + "</ul><p class='small mb0'>Read the matching section in the Maharashtra Board Std 9 " +
        "textbook, Chapter 12 'Study of Sound', and the CBSE Class 9 chapter on Sound.</p></div>";
    } else {
      advice += "<div class='note note-ok'><p class='mb0'>You scored 60% or more in every topic. " +
        "Work on speed now — try to finish the whole paper in about 70 minutes so you have " +
        "20 minutes left to check your answers.</p></div>";
    }
    if (r.timeTakenSeconds > 0) {
      var perQ = r.timeTakenSeconds / r.total;
      advice += "<p class='small muted mt mb0'>You averaged <strong>" + perQ.toFixed(0) +
        " seconds</strong> per question. In the real paper you have 54 seconds per question, " +
        "so aim for well under that on the easy ones to leave time for the numericals.</p>";
    }
    $("advice").innerHTML = advice;

    /* ------------------------------------------------------- review */
    var reviewHtml = r.responses.map(function (x) {
      var state = !x.chosen ? "skipped" : (x.isCorrect ? "correct" : "wrong");
      var q = TEST.questions.filter(function (t) { return t.id === x.qid; })[0] || {};
      var yours = !x.chosen
        ? "<span class='muted'>Not attempted</span>"
        : "<span class='yours " + (x.isCorrect ? "ok" : "bad") + "'>" +
          x.chosen + ". " + HB.escapeHtml(x.chosenText) + "</span>";

      return "<div class='rev " + state + "' data-state='" + state + "'>" +
        "<div class='rhead'>" +
          "<span class='chip'>Q" + x.n + "</span>" +
          "<span class='chip chip-topic'>" + HB.escapeHtml(x.topic) + "</span>" +
          "<span class='chip chip-" + x.difficulty + "'>" +
            x.difficulty.charAt(0).toUpperCase() + x.difficulty.slice(1) + "</span>" +
          (x.marked ? "<span class='chip'>Was marked for review</span>" : "") +
        "</div>" +
        "<div class='q'>" + HB.escapeHtml(q.q || "") + "</div>" +
        "<div class='ans'><span class='k'>Your answer: </span>" + yours + "</div>" +
        (x.isCorrect ? "" :
          "<div class='ans'><span class='k'>Correct answer: </span><span class='right'>" +
          x.correct + ". " + HB.escapeHtml(x.correctText) + "</span></div>") +
        "<div class='why'><b>Why:</b> " + HB.escapeHtml(q.explanation || "") + "</div>" +
      "</div>";
    }).join("");
    $("review").innerHTML = reviewHtml;

    /* filters */
    var filterBtns = $("revFilters").querySelectorAll("button");
    Array.prototype.forEach.call(filterBtns, function (btn) {
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(filterBtns, function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var want = btn.getAttribute("data-filter");
        Array.prototype.forEach.call($("review").children, function (card) {
          card.style.display = (want === "all" || card.getAttribute("data-state") === want) ? "" : "none";
        });
      });
    });

    $("footNote").textContent = HB.sheetsConfigured()
      ? "Your result has been recorded for your teacher."
      : "This deployment is not linked to a results sheet — the result is stored in this browser only.";

    if (!$("syncStatus").textContent.trim()) setSync("", "");
  }

  /* -------------------------------------------------------- kick off */
  render();
  tick();
  ticker = setInterval(tick, 500);
})();
