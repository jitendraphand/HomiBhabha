# Balvaidnyanik Practice — Std 9

A practice-test website for the **Dr. Homi Bhabha Balvaidnyanik Competition,
Standard 9**. The first paper covers the **Sound** chapter: 100 multiple-choice
questions in 90 minutes, in the same pattern as the real first round.

Students open a link, enter their name, roll number and division, and take the
paper. Results go straight into a Google Sheet and appear on a
passcode-protected teacher dashboard.

## What's here

| Page | Purpose |
|---|---|
| `index.html` | Instructions and the student details form |
| `exam.html` | The paper itself, and the report shown after submitting |
| `dashboard.html` | Teacher view of every attempt (passcode required) |
| `DEPLOY.md` | GitHub Pages setup and where the Sheet link goes |
| `syllabus.html` | Exam pattern, syllabus, and a Sound revision checklist |

Everything is plain HTML, CSS and JavaScript. There is no build step, no
framework and no server to run.

## The exam

The competition's round-one paper is **100 marks, 90 minutes, MCQ, no negative
marking**, drawn mainly from the Maharashtra State Board science textbooks with
CBSE and CISCE material filling the gaps. This test mirrors that:

* 100 questions, one mark each, no negative marking
* 90-minute countdown that auto-submits when it hits zero
* Question palette showing answered / marked / blank at a glance
* Mark-for-review, clear-answer, keyboard shortcuts (`A`–`D` or `1`–`4` to
  answer, arrow keys to move, `M` to mark)
* Questions and options shuffled per student, so neighbours see different papers
* Answers saved to the browser as the student goes — a refresh or a dead
  battery does not lose the attempt
* After submitting: score, accuracy, topic-by-topic breakdown, what to revise
  next, and all 100 questions with the correct answer and an explanation

Question coverage, from `assets/data/questions-sound.js`:

| Topic | Qs |
|---|---|
| Nature of sound waves | 14 |
| Reflection of sound & echo | 14 |
| Speed of sound and v = fλ | 12 |
| Characteristics of sound | 12 |
| Range of hearing, infrasound & ultrasound | 10 |
| Reverberation & acoustics | 8 |
| Ultrasound & SONAR | 8 |
| Production of sound | 6 |
| Applications of multiple reflection | 6 |
| Human ear | 6 |
| Propagation of sound | 4 |

41 easy, 43 medium, 16 hard.

## Setting it up

**[DEPLOY.md](DEPLOY.md) is the full walkthrough** — publishing to GitHub
Pages, and exactly which file the Google Sheet link goes in. Summary:

### 1. Publish the site

Push to `main`. The workflow in `.github/workflows/pages.yml` validates the
question bank and deploys to GitHub Pages. Enable it once under
**Settings → Pages → Source → GitHub Actions**.

The site will be at `https://<user>.github.io/<repo>/`.

### 2. Connect Google Sheets

Follow **[apps-script/README.md](apps-script/README.md)** — about ten minutes,
all inside your Google account. It gives you a Web App URL and a teacher
passcode.

### 3. Point the site at it

Edit `assets/js/config.js`:

```js
window.APP_CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb..../exec",
  SCHOOL_NAME: "Your School Name",
  ...
};
```

Commit and push. That is the whole configuration — there are no credentials,
keys or service accounts to manage. The teacher passcode lives in the Apps
Script's Script Properties and never reaches the browser.

Press **Check connection** on the dashboard to confirm the link works before
a class sits the test.

Without a URL the site still works end to end — students get their full report
— but nothing is recorded centrally.

### 4. Run it with a class

Share the site link. Students fill in the form and start. You watch the
dashboard, sort by score, and download a CSV when you want to put marks in a
register.

## Configuration

All in `assets/js/config.js`:

| Setting | Default | What it does |
|---|---|---|
| `APPS_SCRIPT_URL` | `""` | Where results are sent. Empty = offline mode. |
| `SCHOOL_NAME` | `""` | Saved with every result row. |
| `SHUFFLE_QUESTIONS` | `true` | Random question order per student. |
| `SHUFFLE_OPTIONS` | `true` | Random option order per question. |
| `ALLOW_RESUME` | `true` | Let a student reopen an interrupted attempt, clock still running. |
| `RECORD_TAB_SWITCHES` | `true` | Count times the student left the exam tab. |
| `WARN_AT_MINUTES` | `10` | Timer turns amber. |
| `DANGER_AT_MINUTES` | `5` | Timer turns red and pulses. |

## Data collected

Per attempt: name, roll number, division, score, correct/wrong/blank counts,
accuracy, time taken, whether it auto-submitted, tab-switch count, browser and
OS, and a topic-wise breakdown. Per question: what the student chose, what was
correct, and whether they had marked it for review.

It lands in two tabs of your own Google Sheet. Nothing goes anywhere else —
there is no third-party analytics, no tracking and no external asset on any
page.

## If the network drops mid-test

The paper runs entirely in the browser, so a student can lose connectivity for
the whole 90 minutes and still finish. On submit, the result is sent; if that
fails it is queued in the browser and retried automatically the next time the
site is opened online. The Apps Script keys on the attempt ID, so a retry after
a partial success cannot produce a duplicate row.

## Adding another test

1. Copy `assets/data/questions-sound.js` to a new file and give it a unique
   `window.TEST_*` name, `id` and `name`.
2. Swap the `<script>` tag in `index.html` and `exam.html`, and the `TEST`
   reference at the top of `assets/js/start.js` and `assets/js/exam.js`.
3. Run `node scripts/validate-questions.js` before pushing.

The validator checks for 100 questions, unique IDs, exactly four distinct
non-empty options, a valid answer index, a topic, a difficulty and an
explanation on every question — and prints the topic, difficulty and answer-key
spread so you can see the paper is balanced.

## Accuracy of the content

Questions were written against the Maharashtra Board Std 9 chapter *Study of
Sound* and the CBSE Class 9 chapter *Sound*, using the values those books use
(speed of sound 344 m/s at 22 °C, persistence of hearing 0.1 s, 17.2 m minimum
for a distinct echo). Every numerical was worked through. If you spot an error,
fix it in `assets/data/questions-sound.js` and re-run the validator.

This is unofficial practice material and is not published by or affiliated with
the Greater Bombay Science Teachers' Association. Check the official
competition website for current dates, fees and rules.
