/* =====================================================================
   start.js — landing page: validate the student details, create the
   attempt object, and hand over to exam.html.
   ===================================================================== */
(function () {
  "use strict";

  var TEST = window.TEST_SOUND;
  var CFG  = window.APP_CONFIG || {};

  var form = document.getElementById("startForm");
  var fields = ["firstName", "lastName", "rollNo", "division"];

  /* ------------------------------------------------- prefill details */
  var saved = HB.read(HB.KEY.STUDENT, null);
  if (saved) {
    fields.forEach(function (name) {
      var el = document.getElementById(name);
      if (el && saved[name]) el.value = saved[name];
    });
  }

  /* --------------------------------------------- unfinished attempt? */
  var attempt = HB.read(HB.KEY.ATTEMPT, null);
  if (attempt && !attempt.submitted && CFG.ALLOW_RESUME !== false) {
    var elapsed = (Date.now() - attempt.startedAt) / 1000;
    var left = attempt.durationSeconds - elapsed;
    if (left > 5) {
      document.getElementById("resumeBox").classList.remove("hidden");
      document.getElementById("resumeWho").textContent =
        attempt.student.firstName + " " + attempt.student.lastName +
        " (Roll " + attempt.student.rollNo + ", Div " + attempt.student.division + ")";
      document.getElementById("resumeLeft").textContent =
        "Time remaining: " + HB.clock(left) + ". The clock has been running since you started.";
      document.getElementById("startBtn").textContent = "Start a new attempt (discards the old one)";
    } else {
      HB.drop(HB.KEY.ATTEMPT);   // it expired while the tab was closed
    }
  }

  var discardBtn = document.getElementById("discardBtn");
  if (discardBtn) {
    discardBtn.addEventListener("click", function () {
      if (confirm("Discard the unfinished attempt? Those answers cannot be recovered.")) {
        HB.drop(HB.KEY.ATTEMPT);
        location.reload();
      }
    });
  }

  /* ------------------------------------------------------- history */
  var history = HB.read(HB.KEY.HISTORY, []);
  if (history.length) {
    document.getElementById("historyPanel").hidden = false;
    document.getElementById("historyBody").innerHTML = history.map(function (h) {
      return "<tr>" +
        "<td>" + HB.escapeHtml(h.finishedAt) + "</td>" +
        "<td>" + HB.escapeHtml(h.testName) + "</td>" +
        "<td class='num'>" + h.score + " / " + h.total + "</td>" +
        "<td class='num'>" + h.percent + "%</td>" +
        "<td class='num'>" + HB.humanDuration(h.timeTakenSeconds) + "</td>" +
        "</tr>";
    }).join("");
  }

  /* -------------------------------------------------- storage note */
  var note = document.getElementById("storeNote");
  if (note) {
    note.textContent = HB.sheetsConfigured()
      ? "Results are recorded for your teacher."
      : "Results are being kept in this browser only.";
  }

  /* ---------------------------------------------------- validation */
  function setError(name, show) {
    var input = document.getElementById(name);
    var err = document.getElementById("err-" + name);
    if (err) err.classList.toggle("show", show);
    if (input) input.setAttribute("aria-invalid", show ? "true" : "false");
  }

  fields.forEach(function (name) {
    var el = document.getElementById(name);
    if (el) el.addEventListener("input", function () { setError(name, false); });
    if (el) el.addEventListener("change", function () { setError(name, false); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {};
    var firstBad = null;
    fields.forEach(function (name) {
      var value = (document.getElementById(name).value || "").trim();
      var bad = value.length === 0;
      setError(name, bad);
      if (bad && !firstBad) firstBad = name;
      data[name] = value;
    });
    if (firstBad) {
      document.getElementById(firstBad).focus();
      HB.toast("Please fill in all four details.");
      return;
    }

    data.firstName = HB.titleCase(data.firstName);
    data.lastName  = HB.titleCase(data.lastName);
    data.rollNo    = data.rollNo.toUpperCase();
    data.division  = data.division.toUpperCase();

    if (attempt && !attempt.submitted) {
      if (!confirm("Starting a new attempt will discard the unfinished one. Continue?")) return;
    }

    HB.write(HB.KEY.STUDENT, data);

    /* ---- build the attempt -------------------------------------- */
    var attemptId = HB.uid();
    var seed = HB.seedFrom(attemptId);

    var order = TEST.questions.map(function (_, i) { return i; });
    if (CFG.SHUFFLE_QUESTIONS !== false) order = HB.shuffle(order, seed);

    // For each question, the order in which its four options are shown.
    var optionOrder = TEST.questions.map(function (q, i) {
      var idx = q.options.map(function (_, k) { return k; });
      return CFG.SHUFFLE_OPTIONS !== false ? HB.shuffle(idx, seed + i * 7919) : idx;
    });

    var duration = (TEST.durationMinutes || 90) * 60;

    HB.write(HB.KEY.ATTEMPT, {
      attemptId: attemptId,
      testId: TEST.id,
      testName: TEST.name,
      student: data,
      school: CFG.SCHOOL_NAME || "",
      startedAt: Date.now(),
      durationSeconds: duration,
      order: order,
      optionOrder: optionOrder,
      answers: {},          // questionIndex -> chosen ORIGINAL option index
      marked: {},           // questionIndex -> true
      visited: {},          // questionIndex -> true
      current: 0,
      tabSwitches: 0,
      submitted: false,
      device: HB.deviceLabel()
    });

    location.href = "exam.html";
  });
})();
