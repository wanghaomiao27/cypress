import locator from './ElementLocator/select_project.json'
export default class SelectProjectPage{
    constructor() {

    }
    get select_project(){
        return cy.get(locator.SelectProjectPage.selectProjectLocator)
    }
    get enter_product_btn(){
        return cy.get(locator.SelectProjectPage.enterProductBtnLocator)
    }
   get enter_project_name(){
        return cy.get(locator.SelectProjectPage.enterProjectNameLocator)
   }
   selectProject(project_name){
       this.select_project.click();
       this.enter_project_name.clear();
       this.enter_project_name.type(project_name+'{enter}');
       this.enter_product_btn.click();
   }
}

