/* =====================================================================
   CONFIGURATION
   ---------------------------------------------------------------------
   This is the ONLY file you normally need to edit.
   After deploying the Google Apps Script Web App (see apps-script/README.md),
   paste its /exec URL into APPS_SCRIPT_URL below, commit and push.
   ===================================================================== */

window.APP_CONFIG = {

  /* Paste the Apps Script Web App URL here.
     It looks like:
       https://script.google.com/macros/s/AKfycb.................../exec
     Leave it empty ("") to run the test in offline-only mode: results are
     still shown to the student and stored in the browser, but nothing is
     sent to Google Sheets.                                              */
  APPS_SCRIPT_URL: "",

  /* Shown in the page header and saved with every result row.
     Handy if more than one school uses the same deployment.             */
  SCHOOL_NAME: "",

  /* Present the 100 questions in a random order for each student.
     Keeps neighbours from comparing "what did you get for Q7".          */
  SHUFFLE_QUESTIONS: true,

  /* Shuffle the four options within each question as well.              */
  SHUFFLE_OPTIONS: true,

  /* Let a student who accidentally closed the tab resume the same
     attempt with the clock still running. Set false to forbid it.       */
  ALLOW_RESUME: true,

  /* Count how many times the student switched away from the exam tab.
     The number is saved with the result for the teacher to see.
     It is only a record; nothing is blocked.                            */
  RECORD_TAB_SWITCHES: true,

  /* Show the full answer-and-explanation review right after submitting. */
  SHOW_REVIEW_AFTER_SUBMIT: true,

  /* Warn the student when this many minutes are left.                   */
  WARN_AT_MINUTES: 10,
  DANGER_AT_MINUTES: 5
};
