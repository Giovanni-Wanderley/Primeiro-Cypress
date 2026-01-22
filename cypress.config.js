const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 6000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
