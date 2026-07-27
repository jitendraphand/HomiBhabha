#!/usr/bin/env node
/**
 * Sanity check for the question banks. Run with `node scripts/validate-questions.js`.
 * The Pages workflow runs it before publishing, so a broken paper never
 * reaches the students.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA_DIR = path.join(__dirname, "..", "assets", "data");
const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".js"));

let failures = [];
let checked = 0;

function fail(msg) {
  failures.push(msg);
}

for (const file of files) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: file
  });

  const tests = Object.keys(sandbox.window)
    .filter((k) => k.startsWith("TEST_"))
    .map((k) => sandbox.window[k]);

  if (!tests.length) fail(`${file}: no TEST_* object was exported`);

  for (const test of tests) {
    const where = `${file} (${test.id})`;

    ["id", "name", "durationMinutes"].forEach((k) => {
      if (test[k] === undefined) fail(`${where}: missing "${k}"`);
    });

    if (!Array.isArray(test.questions) || !test.questions.length) {
      fail(`${where}: no questions`);
      continue;
    }

    if (test.questions.length !== 100) {
      fail(`${where}: has ${test.questions.length} questions, expected 100`);
    }

    const ids = new Set();
    const texts = new Set();

    test.questions.forEach((q, i) => {
      const at = `${where} Q${i + 1}${q.id ? " [" + q.id + "]" : ""}`;
      checked++;

      if (!q.id) fail(`${at}: missing id`);
      else if (ids.has(q.id)) fail(`${at}: duplicate id`);
      else ids.add(q.id);

      if (!q.q || q.q.trim().length < 10) fail(`${at}: question text missing or too short`);
      else {
        const key = q.q.trim().toLowerCase();
        if (texts.has(key)) fail(`${at}: duplicate question text`);
        texts.add(key);
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        fail(`${at}: needs exactly 4 options, found ${q.options ? q.options.length : 0}`);
      } else {
        const seen = new Set();
        q.options.forEach((o, k) => {
          if (typeof o !== "string" || !o.trim()) fail(`${at}: option ${k + 1} is empty`);
          const key = String(o).trim().toLowerCase();
          if (seen.has(key)) fail(`${at}: option ${k + 1} repeats another option`);
          seen.add(key);
        });
      }

      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
        fail(`${at}: "answer" must be an integer 0-3, found ${JSON.stringify(q.answer)}`);
      }

      if (!q.topic) fail(`${at}: missing topic`);
      if (!["easy", "medium", "hard"].includes(q.difficulty)) {
        fail(`${at}: difficulty must be easy|medium|hard, found ${JSON.stringify(q.difficulty)}`);
      }
      if (!q.explanation || q.explanation.trim().length < 20) {
        fail(`${at}: explanation missing or too short`);
      }
    });

    // Answers should not pile up on one index — a lazy student must not be
    // able to guess "always C". Runtime shuffling hides it anyway, but a
    // skewed bank is a sign of careless authoring.
    const spread = [0, 0, 0, 0];
    test.questions.forEach((q) => {
      if (Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3) spread[q.answer]++;
    });

    const topics = {};
    test.questions.forEach((q) => { topics[q.topic] = (topics[q.topic] || 0) + 1; });

    console.log(`\n${test.name}  —  ${test.questions.length} questions, ${test.durationMinutes} min`);
    console.log(`  answer key spread : A ${spread[0]} · B ${spread[1]} · C ${spread[2]} · D ${spread[3]}`);
    console.log(`  topics            : ${Object.keys(topics).length}`);
    Object.keys(topics).forEach((t) => {
      console.log(`      ${String(topics[t]).padStart(3)}  ${t}`);
    });
    const diff = { easy: 0, medium: 0, hard: 0 };
    test.questions.forEach((q) => { if (diff[q.difficulty] !== undefined) diff[q.difficulty]++; });
    console.log(`  difficulty        : easy ${diff.easy} · medium ${diff.medium} · hard ${diff.hard}`);
  }
}

console.log(`\nChecked ${checked} questions across ${files.length} file(s).`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s) found:`);
  failures.forEach((f) => console.error("  ✗ " + f));
  process.exit(1);
}

console.log("All checks passed.\n");
