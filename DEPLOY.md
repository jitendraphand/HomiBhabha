# Deploying to GitHub Pages

Short answer: **yes, this runs on GitHub Pages exactly as it is.** The whole
site is static HTML, CSS and JavaScript — no server, no build step, no
database. That is precisely why the results go to Google Apps Script: Pages
cannot run server code, but Apps Script can, and it is free.

```
   Student's browser                GitHub Pages            Google (your account)
   ─────────────────                ────────────            ─────────────────────
   takes the test      ──fetches──▶ index/exam/dashboard
   submits result      ─────────────────POST──────────────▶  Apps Script Web App
                                                                    │
   teacher dashboard   ─────────────────GET───────────────▶         ▼
                                          (passcode)          your Google Sheet
```

---

## Part 1 — Publish the site

1. Get the code onto `main` in `jitendraphand/homibhabha`.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. That's it. `.github/workflows/pages.yml` runs on every push to `main`: it
   validates the question bank first, then publishes.

Your site appears at:

```
https://jitendraphand.github.io/homibhabha/
```

The first deploy takes a couple of minutes. Watch it under the **Actions**
tab. If the question-bank validator finds a problem the deploy stops rather
than publishing a broken paper.

> The workflow only fires on `main`. Work committed on a feature branch will
> not deploy until it is merged. You can also trigger a deploy by hand from
> **Actions → Deploy to GitHub Pages → Run workflow**.

Links to share:

| Who | Link |
|---|---|
| Students | `https://jitendraphand.github.io/homibhabha/` |
| Teacher | `https://jitendraphand.github.io/homibhabha/dashboard.html` |

---

## Part 2 — Where the Google Sheet link goes

There are **no credentials, keys or service accounts** to manage. Nothing
secret goes into the repository. Exactly one value does:

### The one thing you paste into the code

**File:** `assets/js/config.js` — **line 17**, the `APPS_SCRIPT_URL` field.

```js
window.APP_CONFIG = {

  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxxxxxxxxxxxx/exec",
  //                └── paste your Web App URL here, between the quotes

  SCHOOL_NAME: "Your School Name",
  ...
};
```

Commit and push that change; Pages redeploys in a minute or two.

You get that URL from **Step 5** of
[`apps-script/README.md`](apps-script/README.md) — deploy the script as a Web
App and Google hands you the `/exec` link. Make sure it ends in `/exec` and
not `/dev`; a `/dev` URL only works while you are signed in and will fail for
students.

### The three things that stay OUT of the code

| Item | Where it lives | Why it is safe |
|---|---|---|
| Teacher passcode | Apps Script → **Project Settings → Script Properties → `ADMIN_KEY`** | Never sent to the browser. The dashboard sends the typed passcode *to* the script, which checks it server-side and refuses if wrong. |
| The Sheet itself | Your Google Drive, private | The script reads and writes it as *you*; the public never touches the Sheet directly. |
| Your Google account | — | No OAuth, no tokens, nothing for the site to hold. |

So the only thing a stranger can learn from reading your repository is the
Web App URL. With it they could post junk rows into the Sheet, but they
cannot read anybody's results without the passcode.

### Checking it worked

Open `dashboard.html` and press **Check connection** before entering the
passcode. You want:

| What you see | Meaning |
|---|---|
| **Connected — passcode is set** | Everything is wired up. |
| **No URL in assets/js/config.js yet** | The paste in Part 2 has not been deployed. |
| **Connected, but no passcode** | Run `setUp` once in the Apps Script editor. |
| **Cannot reach the script** | Usually a `/dev` URL, or **Who has access** was not set to *Anyone*. |

Then take the test yourself and check a row lands in the Sheet.

---

## What to know before a graded mock

**A GitHub Pages site is public, and so are the answers.** The paper is
scored in the student's browser, so `assets/data/questions-sound.js` — with
the correct answer to every question — is downloaded to their device. A
curious student who opens the browser's developer tools can read it. Making
the *repository* private does not change this; the published site still has
to send the file.

For practice at home this is fine. If you want to run this as a real graded
mock where that matters, the fix is to move scoring into the Apps Script:
ship the questions without the `answer` field, have the script mark the paper
and return the report. Say the word and I will make that change — it is
contained, and touches the question file, `exam.js` and `Code.gs`.

Two smaller points in the same vein: anyone with the link can attempt under
any name, because you chose not to have student logins, so roll number and
division are self-reported; and the tab-switch count is a record for you to
look at, not a block on anything.

---

## Alternatives to GitHub Pages

Nothing here is specific to GitHub. The same folder works on Netlify, Vercel,
Cloudflare Pages, Google Drive, or a school server — drop the files in and
serve them. It even runs from `file://` if you open `index.html` directly,
though results will not send from there.
