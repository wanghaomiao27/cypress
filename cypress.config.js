const { defineConfig } = require("cypress");
module.exports = defineConfig({
  projectId: 'e9smt6',
  e2e:
   {
       experimentalStudio:true,
       specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
       defaultCommandTimeout:15000,
       reporter:"mochawesome",
       reporterOptions:{
           reportDir:"cypress/results",
           overwrite:false,
           html:false,
           json:true,
           xml:true
       },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
