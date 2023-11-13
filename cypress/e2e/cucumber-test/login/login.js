import {loginURL} from "../../testData/initHomePage.data";
import{Given,When,And,Then} from "cypress-cucumber-preprocessor/steps";


Given('User is at the login page',()=>{
    cy.initHomePage(loginURL[0].URL);
})

When('User enters username as {string} and password as {string}',(username,password)=>{
   cy.get('#login_username').type(username);
   cy.get('#login_password').type(password);
})

And('User clicks on login button',()=>{
    cy.get('button[type=button]').click()
})

Then('User is able to see the page"product center" ',()=>{
    cy.url().should('include','/aimarketer/usercenter/productcenter')
})