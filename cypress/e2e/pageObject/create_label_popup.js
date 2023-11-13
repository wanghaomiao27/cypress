import locator from './ElementLocator/menu_title_content.json'
export default class SelectMenuPage{
    constructor() {

    }
    get menu_title_content(){
        return cy.get(locator.MenuTitleContentPage.menuTitleClassLocator);
    }
    selectMenu(menu_name){
        let a=this.menu_title_content.contains(menu_name).should('be.visible')
        if(a){
            this.menu_title_content.contains(menu_name).click();
            cy.wait(3000);
        }else{
            cy.log("菜单名字不可见");
        }

    }

}

