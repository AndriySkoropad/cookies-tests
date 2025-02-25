const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cookeys.ca',
    viewportWidth: 1280,
    viewportHeight: 1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
