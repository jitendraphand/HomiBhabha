# Connecting the test to Google Sheets

This takes about ten minutes and you only do it once. Nothing needs to be
installed — everything happens inside your Google account.

At the end you will have:

* a Google Sheet that fills up with one row per student attempt,
* a second tab holding every individual answer, and
* a teacher passcode that unlocks the dashboard page.

---

## Step 1 — Create the Sheet

1. Go to <https://sheets.new> and create a blank spreadsheet.
2. Rename it something like **Homi Bhabha Practice — Results**.

Leave the tabs alone; the script creates and names them itself.

## Step 2 — Open the script editor

In the Sheet, choose **Extensions → Apps Script**. A new tab opens with a
file called `Code.gs` containing a stub `myFunction`.

## Step 3 — Paste the code

1. Select everything in `Code.gs` and delete it.
2. Open [`Code.gs`](Code.gs) from this repository, copy the whole file, and
   paste it in.
3. Press **Ctrl+S** (or the save icon).

## Step 4 — Run the one-time setup

1. In the toolbar, pick **setUp** from the function dropdown.
2. Click **Run**.
3. Google will ask for permission the first time:
   * **Review permissions** → choose your account
   * you will see *"Google hasn't verified this app"* — this is normal for
     your own scripts. Click **Advanced → Go to (project name) (unsafe)**.
   * **Allow**.
4. Open **Execution log** (bottom of the screen). It prints something like:

   ```
   TEACHER PASSCODE (ADMIN_KEY): 7F2A9C4B1D
   ```

   **Copy that passcode and keep it.** It is what you will type into the
   Teacher dashboard. Do not give it to students.

   Prefer your own passcode? In the editor run `setPasscode` after editing
   the call, or set the value directly under
   **Project Settings → Script Properties → ADMIN_KEY**.

Switch back to the Sheet — you will now see **Results** and **Responses**
tabs with headings.

## Step 5 — Deploy as a Web App

1. Top right of the script editor: **Deploy → New deployment**.
2. Click the gear next to *Select type* and choose **Web app**.
3. Fill in:
   * **Description**: `Practice test collector`
   * **Execute as**: **Me** (your account)
   * **Who has access**: **Anyone**

   > "Anyone" is required — students are not signed in to Google when they
   > take the test. It does not make your Sheet public: nobody can read the
   > results without the passcode, and the Sheet itself stays private.

4. Click **Deploy**, approve if asked, and copy the **Web app URL**. It
   looks like:

   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
   ```

## Step 6 — Tell the website about it

Open [`assets/js/config.js`](../assets/js/config.js) in this repository and
paste the URL:

```js
window.APP_CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb..../exec",
  SCHOOL_NAME: "Your School Name",
  ...
};
```

Commit and push. GitHub Pages rebuilds in a minute or two.

## Step 7 — Check it works

1. Open the site and take the test — answer two questions and submit.
2. The result screen should show a green **Result saved** badge.
3. The Sheet should have a new row.
4. Open **Teacher → dashboard**, enter the passcode, and your test row
   should appear.

---

## If something goes wrong

**The result screen says "Not sent — will retry"**
The attempt is safe in the student's browser and will be sent automatically
the next time that browser opens the site with a working connection. Common
causes:

* the URL in `config.js` is wrong or ends in `/dev` instead of `/exec`,
* **Who has access** was left as *Only myself*,
* the deployment was never actually created (saving the code is not enough).

**The dashboard says "Wrong teacher passcode"**
Check **Project Settings → Script Properties → ADMIN_KEY** in the script
editor and use exactly that value.

**Nothing arrives at all and the browser console shows a CORS error**
You are almost certainly pointing at a `/dev` URL. Only the `/exec` URL of a
published deployment accepts requests from other sites.

## After you change `Code.gs`

Saving the file is not enough. Go to **Deploy → Manage deployments**, click
the pencil, set **Version** to **New version**, and click **Deploy**. The
URL stays the same, so you do not need to touch `config.js` again.

## Where the data lives

| Tab | One row per | Useful for |
|---|---|---|
| `Results` | student attempt | ranking, marks, time taken, tab switches |
| `Responses` | question within an attempt | seeing exactly which questions the class got wrong |

Both tabs are ordinary Sheets data. Sort, filter, pivot or chart them as you
like — the script only ever appends, so nothing you do to the layout will be
overwritten.

An attempt is written **once**. If a student's phone loses signal, the result
is queued in their browser and retried later; the script recognises the
attempt ID and refuses to write a duplicate row.
