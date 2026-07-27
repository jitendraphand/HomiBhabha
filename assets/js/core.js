/* =====================================================================
   core.js — shared helpers: storage, formatting, and the Sheets client.
   Loaded by every page.
   ===================================================================== */
(function (global) {
  "use strict";

  var CFG = global.APP_CONFIG || {};

  var KEY = {
    STUDENT: "hb.student",
    ATTEMPT: "hb.attempt",
    QUEUE:   "hb.queue",
    HISTORY: "hb.history",
    ADMIN:   "hb.adminkey"
  };

  /* ---------------------------------------------------------- storage */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }
  function drop(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  /* ------------------------------------------------------- formatting */
  function two(n) { return (n < 10 ? "0" : "") + n; }

  /**
   * seconds -> "MM:SS", counting minutes past 60 rather than rolling over
   * into hours. A 90-minute paper reads "90:00", which is how every exam
   * hall clock a student has seen behaves; "1:29:59" makes them do sums.
   */
  function clock(totalSeconds) {
    var s = Math.max(0, Math.floor(totalSeconds));
    return two(Math.floor(s / 60)) + ":" + two(s % 60);
  }

  /** seconds -> "1 h 23 min" style, for the report */
  function humanDuration(totalSeconds) {
    var s = Math.max(0, Math.round(totalSeconds));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    if (h) return h + " h " + m + " min";
    if (m) return m + " min " + sec + " s";
    return sec + " s";
  }

  function stamp(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()) +
           " " + two(d.getHours()) + ":" + two(d.getMinutes());
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function titleCase(str) {
    return String(str || "").trim().toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/(^|[\s'-])([a-z])/g, function (m, p, c) { return p + c.toUpperCase(); });
  }

  /* ------------------------------------------------------------ misc */
  function uid() {
    return "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  /** Fisher-Yates, seeded so a resumed attempt keeps the same order. */
  function shuffle(array, seed) {
    var a = array.slice();
    var s = seed >>> 0 || 1;
    function rnd() {                       // mulberry32
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function seedFrom(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function deviceLabel() {
    var ua = navigator.userAgent || "";
    var os = /Android/i.test(ua) ? "Android"
           : /iPhone|iPad|iPod/i.test(ua) ? "iOS"
           : /Windows/i.test(ua) ? "Windows"
           : /Mac OS X/i.test(ua) ? "macOS"
           : /Linux/i.test(ua) ? "Linux" : "Other";
    var br = /Edg\//.test(ua) ? "Edge"
           : /OPR\//.test(ua) ? "Opera"
           : /Chrome\//.test(ua) ? "Chrome"
           : /Firefox\//.test(ua) ? "Firefox"
           : /Safari\//.test(ua) ? "Safari" : "Browser";
    return os + " / " + br;
  }

  /* ----------------------------------------------------------- toast */
  var toastEl = null, toastTimer = null;
  function toast(message, ms) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    // force reflow so repeated toasts re-animate
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, ms || 2600);
  }

  /* ============================================================ SHEETS
     Apps Script web apps accept a "simple" cross-origin request without a
     CORS preflight as long as the content type is text/plain. We therefore
     send the JSON payload as a plain-text body; the script parses it with
     JSON.parse(e.postData.contents).
     ================================================================== */

  function endpoint() {
    return (CFG.APPS_SCRIPT_URL || "").trim();
  }

  function configured() {
    return /^https:\/\/script\.google(usercontent)?\.com\//.test(endpoint());
  }

  function postJSON(payload) {
    if (!configured()) {
      return Promise.reject(new Error("not-configured"));
    }
    return fetch(endpoint(), {
      method: "POST",
      // text/plain keeps this a "simple request" — no CORS preflight
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function (data) {
      if (!data || data.ok !== true) {
        throw new Error((data && data.error) || "Rejected by server");
      }
      return data;
    });
  }

  function getJSON(params) {
    if (!configured()) return Promise.reject(new Error("not-configured"));
    var qs = Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
    }).join("&");
    return fetch(endpoint() + "?" + qs, { method: "GET", redirect: "follow" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || data.ok !== true) {
          throw new Error((data && data.error) || "Rejected by server");
        }
        return data;
      });
  }

  /* --------------------------------------------------- offline queue */
  function queueAdd(payload) {
    var q = read(KEY.QUEUE, []);
    // don't queue the same attempt twice
    if (!q.some(function (p) { return p.attemptId === payload.attemptId; })) {
      q.push(payload);
      write(KEY.QUEUE, q);
    }
  }
  function queueSize() { return read(KEY.QUEUE, []).length; }

  /** Try to send every queued result. Resolves with {sent, left}. */
  function queueFlush() {
    var q = read(KEY.QUEUE, []);
    if (!q.length || !configured()) {
      return Promise.resolve({ sent: 0, left: q.length });
    }
    var sent = 0;
    return q.reduce(function (chain, payload) {
      return chain.then(function (remaining) {
        return postJSON(payload).then(function () {
          sent++;
          return remaining;
        }).catch(function () {
          remaining.push(payload);
          return remaining;
        });
      });
    }, Promise.resolve([])).then(function (remaining) {
      write(KEY.QUEUE, remaining);
      return { sent: sent, left: remaining.length };
    });
  }

  /**
   * Send a finished attempt. Always resolves — never rejects — so the
   * student's result screen is shown no matter what the network does.
   * Resolves with "sent" | "queued" | "offline-mode".
   */
  function submitResult(payload) {
    if (!configured()) {
      return Promise.resolve("offline-mode");
    }
    return postJSON(payload)
      .then(function () { return "sent"; })
      .catch(function () { queueAdd(payload); return "queued"; });
  }

  /* --------------------------------------------------- local history */
  function historyAdd(summary) {
    var h = read(KEY.HISTORY, []);
    h.unshift(summary);
    write(KEY.HISTORY, h.slice(0, 25));
  }

  /* ---------------------------------------------------------- export */
  global.HB = {
    KEY: KEY,
    read: read, write: write, drop: drop,
    clock: clock, humanDuration: humanDuration, stamp: stamp,
    escapeHtml: escapeHtml, titleCase: titleCase,
    uid: uid, shuffle: shuffle, seedFrom: seedFrom,
    deviceLabel: deviceLabel, toast: toast,
    sheetsConfigured: configured,
    submitResult: submitResult,
    queueSize: queueSize, queueFlush: queueFlush,
    getJSON: getJSON, postJSON: postJSON,
    historyAdd: historyAdd
  };

  /* Opportunistically retry anything stuck in the queue. */
  if (configured()) {
    global.addEventListener("online", function () { queueFlush(); });
    if (navigator.onLine !== false && queueSize() > 0) {
      setTimeout(function () { queueFlush(); }, 1500);
    }
  }
})(window);
