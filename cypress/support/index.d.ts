
declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.clickOnMyJourneyInCandidateCabinet()
         */
        initHomePage(URL:string): Cypress.Chainable<string>;
        login(username: string, password: string): Cypress.Chainable<string>;
        selectProject(project_name:string): Cypress.Chainable<string>;
        selectMenu(menu_name:string):Cypress.Chainable<string>;
        selectLabelType(label_type:string):Cypress.Chainable<string>;
        createBasicLabel(ID_type:string,
                         label_category:string,
                         valid_time:string,
                         comment:string,
                         data_column:string,
                         column_field:string):Cypress.Chainable<string>;
        exit():Cypress.Chainable<null>;
        approveLabel(approve_opinion:string,URL:string):Cypress.Chainable<string>;
        labelStatusCheck(label_status:string,approve_status:string,cal_status:string):Cypress.Chainable<string>;
        getToken(url:string):Cypress.Chainable<string>;
    }
}