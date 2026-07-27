/* =====================================================================
   dashboard.js — teacher view. The passcode is verified server-side by
   the Apps Script; this page only holds it for the session.
   ===================================================================== */
(function () {
  "use strict";

  var TEST = window.TEST_SOUND;
  var $ = function (id) { return document.getElementById(id); };

  var rows = [];        // Results sheet

  /* Roll numbers are written to the sheet with a leading apostrophe so that
     "007" survives as text. Sheets normally strips it on read, but not every
     path does, so make sure it never reaches the screen or the CSV. */
  function normaliseRows(list) {
    (list || []).forEach(function (r) {
      if (typeof r["Roll No"] === "string") r["Roll No"] = r["Roll No"].replace(/^'/, "");
    });
    return list || [];
  }

  var analysis = [];    // per-question stats
  var sortKey = "Percent";
  var sortDir = -1;

  /* --------------------------------------------------------- gating */
  if (!HB.sheetsConfigured()) {
    $("gateNote").classList.remove("hidden");
    $("gateBtn").disabled = true;
    $("pass").disabled = true;
  }

  var stored = sessionStorage.getItem(HB.KEY.ADMIN);
  if (stored) unlock(stored, true);

  $("gateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    unlock($("pass").value.trim(), false);
  });

  function unlock(key, quiet) {
    if (!key) return;
    var btn = $("gateBtn");
    btn.disabled = true;
    btn.textContent = "Checking…";

    HB.getJSON({ action: "results", key: key })
      .then(function (data) {
        sessionStorage.setItem(HB.KEY.ADMIN, key);
        rows = normaliseRows(data.rows);
        $("gate").classList.add("hidden");
        $("board").classList.remove("hidden");
        ["refreshBtn", "csvBtn", "logoutBtn"].forEach(function (id) {
          $(id).classList.remove("hidden");
        });
        draw();
        return HB.getJSON({ action: "analysis", key: key });
      })
      .then(function (data) {
        analysis = data.questions || [];
        drawAnalysis();
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.textContent = "Unlock";
        sessionStorage.removeItem(HB.KEY.ADMIN);
        if (!quiet) {
          $("err-pass").textContent = err.message === "not-configured"
            ? "This site is not linked to a results sheet yet."
            : err.message;
          $("err-pass").classList.add("show");
        }
      });
  }

  $("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem(HB.KEY.ADMIN);
    location.reload();
  });

  $("refreshBtn").addEventListener("click", function () {
    var key = sessionStorage.getItem(HB.KEY.ADMIN);
    $("refreshBtn").disabled = true;
    Promise.all([
      HB.getJSON({ action: "results", key: key }),
      HB.getJSON({ action: "analysis", key: key })
    ]).then(function (out) {
      rows = normaliseRows(out[0].rows);
      analysis = out[1].questions || [];
      draw(); drawAnalysis();
      HB.toast("Refreshed — " + rows.length + " attempts.");
    }).catch(function (err) {
      HB.toast("Could not refresh: " + err.message);
    }).then(function () {
      $("refreshBtn").disabled = false;
    });
  });

  /* -------------------------------------------------------- filters */
  ["fDivision", "fTest", "fSearch"].forEach(function (id) {
    $(id).addEventListener("input", draw);
    $(id).addEventListener("change", draw);
  });

  function filtered() {
    var div = $("fDivision").value;
    var test = $("fTest").value;
    var q = $("fSearch").value.trim().toLowerCase();

    return rows.filter(function (r) {
      if (div && String(r["Division"]) !== div) return false;
      if (test && String(r["Test Name"]) !== test) return false;
      if (q) {
        var hay = (String(r["Full Name"] || "") + " " + String(r["Roll No"] || "")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function refreshFilterOptions() {
    fill("fDivision", unique("Division"), "All divisions");
    fill("fTest", unique("Test Name"), "All tests");
  }
  function unique(key) {
    var seen = {};
    rows.forEach(function (r) { if (r[key] !== "" && r[key] != null) seen[r[key]] = 1; });
    return Object.keys(seen).sort();
  }
  function fill(id, values, allLabel) {
    var sel = $(id);
    if (sel.dataset.filled === values.join("|")) return;
    var keep = sel.value;
    sel.innerHTML = '<option value="">' + allLabel + "</option>" +
      values.map(function (v) { return "<option>" + HB.escapeHtml(v) + "</option>"; }).join("");
    sel.value = keep;
    sel.dataset.filled = values.join("|");
  }

  /* --------------------------------------------------------- sorting */
  Array.prototype.forEach.call(
    document.querySelectorAll("#resultsTable th[data-sort]"),
    function (th) {
      th.addEventListener("click", function () {
        var key = th.getAttribute("data-sort");
        if (key === sortKey) sortDir = -sortDir;
        else { sortKey = key; sortDir = (key === "Full Name" || key === "Division") ? 1 : -1; }
        draw();
      });
    }
  );

  /* ---------------------------------------------------------- render */
  function draw() {
    refreshFilterOptions();
    var list = filtered().slice();

    if (sortKey !== "rank") {
      list.sort(function (a, b) {
        var x = a[sortKey], y = b[sortKey];
        if (typeof x === "number" && typeof y === "number") return (x - y) * sortDir;
        return String(x).localeCompare(String(y)) * sortDir;
      });
    }

    /* summary tiles */
    var scores = list.map(function (r) { return Number(r["Percent"]) || 0; });
    var avg = scores.length ? scores.reduce(function (a, b) { return a + b; }, 0) / scores.length : 0;
    var best = scores.length ? Math.max.apply(null, scores) : 0;
    var passCount = scores.filter(function (s) { return s >= 35; }).length;
    var blanks = list.reduce(function (a, r) { return a + (Number(r["Not Attempted"]) || 0); }, 0);

    $("summary").innerHTML = [
      tile(list.length, "Attempts"),
      tile(avg.toFixed(1) + "%", "Class average"),
      tile(best.toFixed(1) + "%", "Highest"),
      tile(passCount, "Scored 35%+"),
      tile(list.length ? (blanks / list.length).toFixed(1) : "0", "Avg. left blank")
    ].join("");

    $("boardSub").textContent = rows.length
      ? rows.length + " attempt" + (rows.length === 1 ? "" : "s") + " recorded so far."
      : "No attempts have been recorded yet.";

    /* table */
    $("resultsBody").innerHTML = list.map(function (r, i) {
      var pct = Number(r["Percent"]) || 0;
      var colour = pct >= 70 ? "var(--ok-soft);color:var(--ok)"
                 : pct >= 40 ? "var(--warn-soft);color:var(--warn)"
                 : "var(--bad-soft);color:var(--bad)";
      var tabs = Number(r["Tab Switches"]) || 0;
      return "<tr>" +
        "<td class='num'>" + (i + 1) + "</td>" +
        "<td>" + HB.escapeHtml(r["Full Name"]) + "</td>" +
        "<td class='num'>" + HB.escapeHtml(r["Roll No"]) + "</td>" +
        "<td>" + HB.escapeHtml(r["Division"]) + "</td>" +
        "<td class='num'>" + r["Score"] + " / " + r["Out Of"] + "</td>" +
        "<td class='num'><span class='pill' style='background:" + colour + "'>" + pct + "%</span></td>" +
        "<td class='num'>" + r["Correct"] + "</td>" +
        "<td class='num'>" + r["Wrong"] + "</td>" +
        "<td class='num'>" + r["Not Attempted"] + "</td>" +
        "<td class='num'>" + HB.humanDuration(r["Time Taken (s)"]) + "</td>" +
        "<td class='num'" + (tabs > 3 ? " style='color:var(--bad);font-weight:700'" : "") + ">" + tabs + "</td>" +
        "<td>" + HB.escapeHtml(String(r["Recorded At"] || "").replace("T", " ").slice(0, 16)) + "</td>" +
        "</tr>";
    }).join("") || "<tr><td colspan='12' class='center muted'>Nothing to show for these filters.</td></tr>";

    $("tableNote").textContent = "Showing " + list.length + " of " + rows.length +
      " attempts. Click any column heading to sort. 'Tab sw.' counts how many times " +
      "the student left the exam tab.";

    drawTopics(list);
  }

  function tile(n, label) {
    return "<div class='fact'><span class='n'>" + n + "</span><span class='l'>" + label + "</span></div>";
  }

  /* ------------------------------------------------ topic breakdown */
  function drawTopics(list) {
    var agg = {};
    list.forEach(function (r) {
      // "Topic: 4/6 | Topic: 3/5"
      String(r["Topic Breakdown"] || "").split("|").forEach(function (part) {
        var m = part.match(/^\s*(.+?):\s*(\d+)\s*\/\s*(\d+)\s*$/);
        if (!m) return;
        var name = m[1];
        if (!agg[name]) agg[name] = { correct: 0, total: 0 };
        agg[name].correct += Number(m[2]);
        agg[name].total += Number(m[3]);
      });
    });

    var bars = Object.keys(agg).map(function (name) {
      var t = agg[name];
      return { name: name, pct: t.total ? t.correct / t.total * 100 : 0, correct: t.correct, total: t.total };
    }).sort(function (a, b) { return a.pct - b.pct; });

    $("topicBars").innerHTML = bars.length ? bars.map(function (t) {
      var colour = t.pct >= 75 ? "var(--ok)" : t.pct >= 50 ? "var(--warn)" : "var(--bad)";
      return "<div class='tbar'><div class='top'><b>" + HB.escapeHtml(t.name) + "</b>" +
        "<span>" + t.correct + " / " + t.total + "  ·  " + Math.round(t.pct) + "%</span></div>" +
        "<div class='track'><div class='fill' style='width:" + t.pct + "%;background:" + colour + "'></div></div></div>";
    }).join("") : "<p class='muted small mb0'>No data yet.</p>";
  }

  /* --------------------------------------------- question analysis */
  function drawAnalysis() {
    var byId = {};
    TEST.questions.forEach(function (q) { byId[q.id] = q; });

    $("analysisBody").innerHTML = analysis.length ? analysis.map(function (a) {
      var q = byId[a.qid];
      var colour = a.percentCorrect >= 70 ? "var(--ok-soft);color:var(--ok)"
                 : a.percentCorrect >= 40 ? "var(--warn-soft);color:var(--warn)"
                 : "var(--bad-soft);color:var(--bad)";
      return "<tr>" +
        "<td style='white-space:normal;max-width:420px'><b>" + HB.escapeHtml(a.qid) + "</b> — " +
          HB.escapeHtml(q ? q.q : "(question not in this build)") + "</td>" +
        "<td>" + HB.escapeHtml(a.topic) + "</td>" +
        "<td class='num'>" + a.attempts + "</td>" +
        "<td class='num'>" + a.correct + "</td>" +
        "<td class='num'>" + a.skipped + "</td>" +
        "<td class='num'><span class='pill' style='background:" + colour + "'>" +
          a.percentCorrect + "%</span></td>" +
        "</tr>";
    }).join("") : "<tr><td colspan='6' class='center muted'>No attempts recorded yet.</td></tr>";
  }

  /* -------------------------------------------------------- CSV out */
  $("csvBtn").addEventListener("click", function () {
    var list = filtered();
    if (!list.length) { HB.toast("Nothing to export."); return; }

    var headers = Object.keys(list[0]);
    var lines = [headers.map(csvCell).join(",")];
    list.forEach(function (r) {
      lines.push(headers.map(function (h) { return csvCell(r[h]); }).join(","));
    });

    var blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "balvaidnyanik-results-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  function csvCell(v) {
    var s = v == null ? "" : String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
})();
