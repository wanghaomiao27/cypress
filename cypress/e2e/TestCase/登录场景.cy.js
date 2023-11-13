import{testLoginAdminUser} from "../testData/testLogin.data";
import{loginURL} from "../testData/initHomePage.data";

context("登录",function (){
    beforeEach(function (){
        cy.initHomePage(loginURL[0].URL);
    })
    cy.pause();
    for(const user of testLoginAdminUser){
        it(user.summary,function(){
            cy.login(user.username,user.password);
        })
    }
    afterEach(function (){
        cy.clearCookies();
    })

})