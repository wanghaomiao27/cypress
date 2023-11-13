import{testLoginAdminUser} from "../testData/testLogin.data";
import{loginURL} from "../testData/initHomePage.data";

context("接口依赖测试",function (){
    let responseBody  //定义接口返回结果为变量
    let responseToken //定义token变量，让下游使用
    it('登录请求',()=>{
        //cy.wrap(localStorage.getItem())
            cy.request({
                method:'POST',
                url:'http://wolf.test.datatist.cn/analyzer/analyzer/account/login.do',
                headers:{"Project-Id":"Jevf4ghaKT091r5E",
                        "Content-Type":"application/json"
                },
                failOnStatusCode:false,
                body:{
                    "password": "abcd1234",
                    "rememberMe": true,
                    "scope": "",
                    "username": "analyzer@datatist.com"
                }
            }).then((response)=>{
                expect(response.status).to.eq(200)
            }
    )

            });
    it('调用手动计算接口',()=>{
        cy.window().then((window)=>{
           cy.request({
              method:'POST',
              url:'http://wolf.test.datatist.cn/analyzer/tag/engine/calculateTaskManuallyByBatch.do',
               headers:{
                  "Project-Id":"Jevf4ghaKT091r5E",
                   "Content-Type":"application/json",
                   "Authorization":"ANALYZER.Bearer " +
                       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTk8tUk9MRSIsInVzZXJJZCI6IjIiLCJ0ZXJtaW5hbElkIjoidGVybWluYWxJZCIsInN1YiI6IiIsImlzcyI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2IiwiaWF0IjoxNjk5ODQ0MzY3LCJhdWQiOiJyZXN0YXBpdXNlci1kdCIsImV4cCI6MTcwMDAxNzE2NywibmJmIjoxNjk5ODQ0MzY3fQ.PHxfZh7DGEy7Nv6UQZf1K9NcV90pXHfCTuWRoY8CgDI"
               },
               body:{
                  "taskId":"11528466840224",
                   "labelId":892
               }
           }).then((response)=>{
               expect(response.status).to.eq(200);
           })
        })
    })
        }
    )