const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "852777ce-2300-4266-95bc-2bf7fe11600b",
  e2e: {
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 6000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: false,
      timestamp: "mmddyyyy_HHMMss",
    },
  },
});
