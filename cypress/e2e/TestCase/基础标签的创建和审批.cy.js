import{ testLoginAdminUser, testLoginApprove, projectName} from "../testData/testLogin.data";
import{menuSelect} from "../testData/menu.data";
import{loginURL} from "../testData/initHomePage.data";
import{labelName,labelStatusCheck} from "../testData/labelType.data";
import{createBasicLabel} from "../testData/createBasicLabel.data";
import{approveOpinion} from "../testData/approveOpinion.data";


//describe:可以理解为一个测试集合，下面可以包含很多it,一个it就是一个测试用例
describe('创建标签', () => {
  Cypress.on("uncaught:exception",(err) =>{
    return !err.message.includes("ResizeObserver");
  });
  //执行测试用例之前打开AIM首页
  beforeEach(function(){
    cy.initHomePage(loginURL[0].URL);
  })
  //创建一个基础标签并审核通过
  it('创建基础标签并审核通过', () => {

    //第一步：输入管理员用户名和密码，然后登录

    cy.login(testLoginAdminUser[0].username,testLoginAdminUser[0].password);
    //cy.pause();

    //第二步：选择“测试项目”
    cy.selectProject(projectName[0].project);
    //cy.pause();
    //第三步：选择顶部菜单里的“数据中心”
    cy.selectMenu(menuSelect[0].menu_name);

    //第四步：选择二级菜单“标签管理”
    cy.get('li[name="标签管理"]').click();
    cy.url().should('include','src=/tag/aimarketer/iframe/labelmanage');

    //第五步：点击右上角的“新建”并选择“基础标签”
    cy.selectLabelType(labelName[0].label_name);

    //第六步：在创建基础标签的页面创建一个标签:场景0，永久有效，标签分类-转账，统计规则-用户信息表+名字
    cy.createBasicLabel(createBasicLabel[0].ID_type,
                        createBasicLabel[0].label_category,
                        createBasicLabel[0].valid_time,
                        createBasicLabel[0].comment,
                        createBasicLabel[0].data_column,
                        createBasicLabel[0].column_field);
    //第七步：退出当前账号
    cy.exit();

    //第八步：登录审批人的账号
    cy.login(testLoginApprove[0].username,testLoginApprove[0].password);

    //第九步：选择项目“测试项目”
    cy.selectProject(projectName[0].project);

    //第十步：找到刚才创建的标签并审批通过
    cy.approveLabel(approveOpinion[0].approve_comment,approveOpinion[0].URL);

    //第十一步：退出审批人的账号
    cy.exit();

    //第十二步：再次登录管理员账号并切换到标签管理菜单
    cy.login(testLoginAdminUser[0].username,testLoginAdminUser[0].password);
    cy.selectProject(projectName[0].project);
    cy.selectMenu(menuSelect[0].menu_name);
    cy.get('li[name="标签管理"]').click();
    cy.url().should('include','src=/tag/aimarketer/iframe/labelmanage');

   //第十三步：找到审批通过的标签验证标签是"正常运行”，“审批通过”状态,且计算状态应该是“等待上游就绪”
    cy.iframe('.iframeStyle').find('.btnGroup .ant-input-search .ant-input-affix-wrapper input.ant-input').focus();
    cy.window().then(win =>{
      let textValue1 = win.localStorage.getItem('textValue1');
      cy.iframe('.iframeStyle')
          .find('.btnGroup .ant-input-search .ant-input-affix-wrapper input.ant-input')
          .type(textValue1);
      cy.iframe('.iframeStyle')
          .find('.btnGroup .ant-input-search .ant-input-group-addon button svg[data-icon="search"]')
          .click({force:true});
      cy.labelStatusCheck(labelStatusCheck[0].label_status,labelStatusCheck[0].approve_status,labelStatusCheck[0].cal_status)
    })
  })
  // 执行用例执行用例之后清除登录信息
  afterEach(function(){
    cy.clearCookies();
  })
})