// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from "../e2e/pageObject/login";
import SelectProjectPage from "../e2e/pageObject/select_project";
import SelectMenuPage from "../e2e/pageObject/select_menu";
require('cypress-iframe')
import('cypress-xpath')
require('cypress-wait-until')
//打开首页，并进行初始化
Cypress.Commands.add('initHomePage',(URL) =>{
    cy.viewport(1920,1080);//调整浏览器分辨率以显示页面全部元素
    cy.clearCookies();
    cy.visit(URL);//打开AIM登录网址
    cy.url().should('include','wolf.test.datatist.cn');//登录网址应该包含特定的域名
    cy.title().should('contain','TEST|Datatist');//标题应包含特定的文本
})
//输入用户名和密码，并登录
Cypress.Commands.add('login',(username,pwd) =>{
    const newlogin = new LoginPage();
    newlogin.username.type(username);
    newlogin.password.type(pwd);
    newlogin.submit.click({force:true});
    newlogin.isTargetPage();
})
//选择项目
Cypress.Commands.add('selectProject',(project_name) =>{
     const selectProjectPage=new SelectProjectPage();
     selectProjectPage.selectProject(project_name);
})
//选择一级菜单
Cypress.Commands.add('selectMenu',(menu_name)=>{
    const selectMenuPage = new SelectMenuPage();
    selectMenuPage.selectMenu(menu_name);
})
//点击新建,并选择需要创建标签的类型
Cypress.Commands.add('selectLabelType',(label_type)=>{
    cy.iframe('.iframeStyle')
        .find('div.btnGroup > button.ant-btn.ant-btn-primary.btnGroup-item')
        .should('be.enabled');
    cy.iframe('.iframeStyle')
        .find('div.btnGroup > button.ant-btn.ant-btn-primary.btnGroup-item')
        .click();//点击页面右上角的“新建”按钮；
    let pop;
    pop = cy.iframe('.iframeStyle').find('.ant-modal-body')
    try{
        if(pop){
            console.log("标签创建弹出框存在");
            pop.xpath('//div[text()="'+label_type+'"]').should('be.visible');
            pop.xpath('//div[text()="'+label_type+'"]').click();//label_type表示的是标签类型，如“基础标签”，"运算标签“等等
        }
    }catch(e){
        cy.log("标签创建弹出框不存在");
    }
})
//创建一个基础标签
Cypress.Commands.add('createBasicLabel',(ID_type,
                                                  label_category,
                                                  valid_time,
                                                  comment,
                                                  data_column,
                                                  column_field)=>{
    const timestamp = (new Date()).valueOf();
    cy.iframe('.iframeStyle').find('input#idType').should('be.enabled').click();
    cy.iframe('.iframeStyle').xpath('//div[text()="'+ID_type+'"]').click();//选择ID类型
    cy.iframe('.iframeStyle').xpath('//*[@id="name"]').clear();
    cy.iframe('.iframeStyle').xpath('//*[@id="name"]').type('Auto-Cypress-基础'+timestamp);//填写标签名称
    cy.iframe('.iframeStyle').xpath('//*[contains(text(),"未分类")]').click();
    cy.wait(2000);
    //判断标签分类是否为空，如果不为空选择一个标签分类
    if (label_category!=null){
        cy.iframe('.iframeStyle').xpath('//span[text()="'+label_category+'"]').click();
    }else{
        cy.iframe('.iframeStyle').xpath('//*[contains(text(),"未分类")]').click();
    }
    cy.iframe('.iframeStyle').find('input[type="radio"][value='+valid_time+']').click();//选择有效时间
    cy.iframe('.iframeStyle').find('#remark').should('have.id','remark');
    if(typeof comment!=='undefined'){
        cy.iframe('.iframeStyle').find('#remark').type(comment);
    }else{
        cy.iframe('.iframeStyle').find('#remark').should("contain.text","");
    }
    cy.iframe('.iframeStyle').find('.executive-once').click({force:true});
    cy.iframe('.iframeStyle').find('.executive-once').should('contain.text',"仅在创建完成后计算一次");
    cy.iframe('.iframeStyle').xpath('//span[text()="下一步"]').click();
    cy.iframe('.iframeStyle').xpath('//input[@id="dataTable"]').click();
    cy.wait(2000);
    cy.iframe('.iframeStyle').xpath('//div[text()="'+data_column+'"]').click();
    cy.iframe('.iframeStyle').xpath('//input[@id="dataTableColumnName"]').click();
    cy.iframe('.iframeStyle').xpath('//div[text()="'+column_field+'"]').click({force:true});
    //cy.iframe('.iframeStyle').xpath('//span[text()="创 建"]').should('be.enabled');
    cy.iframe('.iframeStyle').xpath('//span[text()="创 建"]').click();
    cy.iframe('.iframeStyle').xpath('//span[text()="更 多"]').trigger('mouseover');
    cy.wait(2000);
    cy.iframe('.iframeStyle').xpath('//a[text()="发布"]').click();
    cy.iframe('.iframeStyle')
        .find('.ant-badge-status-text')
        .eq(0)
        .should('have.text','待发布');
    cy.iframe('.iframeStyle').find('.tag-model-btn')
        .should('exist')
        .should('have.text',' 发布审批中');
    cy.iframe('.iframeStyle').find('.ant-page-header-heading-title').then(($text1) =>{
        cy.wrap(localStorage.setItem('textValue1',$text1.text()));
    })//把标签的名字存到缓存中，然后等审批的角色登录以后，输入标签名字审批。
})
//退出登录
Cypress.Commands.add('exit',() => {
    const element = document.getElementsByClassName('loginusername');
    try {
        if (element) {
            cy.get('.userAndSetting .userInfo .head-portrait').click({force: true});
            cy.get('.exit').click('center');
            cy.url().should('include', '/aimarketer/login');
            cy.title().should(($title) => {
                expect($title.valueOf()).to.contains('TEST|Datatist');
            })
        } else {
            return false;
        }
    }catch (e) {
        cy.log('用户名不存在，无法退出！');
    }
})
//审批新的标签
Cypress.Commands.add('approveLabel',(approve_opinion,URL)=>{
    cy.visit(URL);//直接通过路由访问我的待审批列表
    cy.get('#rc-tabs-0-tab-2').click(); //点击“待审批的”tab
    cy.window().then(win =>{
        let textValue1 = win.localStorage.getItem('textValue1');
        cy.get('div#rc-tabs-0-panel-2 #contentName').click({force:true}).type(textValue1);
    })
    cy.get('.ant-col-xs-24 > .ant-space > [style=""] > .ant-btn > span').click();
    cy.get("a[type=link]").contains("通过").first().click();
    if (approve_opinion!=null){
       cy.get('#basic_opinion').type(approve_opinion);
       cy.get('button[type="button"]').contains('确认通过').click();
    }else{
        cy.get('button[type="button"]').contains('确认通过').click();
    }
})
//搜索出唯一的标签，然后检查标签的“标签状态”，“标签的审批状态”，“标签的计算状态”
Cypress.Commands.add('labelStatusCheck',(label_status,approve_status,cal_status)=>{
    cy.iframe('.iframeStyle')
        .find('span.ant-badge-status-text')
        .first()
        .should('have.text',label_status);
    cy.iframe('.iframeStyle')
        .find('td[class=ant-table-cell]')
        .eq(5)
        .should('have.text',approve_status);
    cy.iframe('.iframeStyle')
        .find('td[class=ant-table-cell]')
        .eq(6)
        .should('contain.text',cal_status);
})




