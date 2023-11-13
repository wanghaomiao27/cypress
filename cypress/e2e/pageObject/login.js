import locator from './ElementLocator/login.json'
export default class LoginPage{
    constructor() {
        this.url='/aimarketer/usercenter/productcenter'
    }
    get username(){
        return cy.get(locator.LoginPage.userNameLocator)
    }
    get password(){
        return cy.get(locator.LoginPage.passWordLocator)
    }
    get submit(){
        return cy.get(locator.LoginPage.submitLocator)
    }
    isTargetPage(){
        cy.url().should('include',this.url)
    }
    login(username,pwd){
        if (username!==null){
            this.username.type(username)
        }
        if(pwd!==""){
            this.password.type(pwd)
        }
        this.submit.click("topRight")
    }
}