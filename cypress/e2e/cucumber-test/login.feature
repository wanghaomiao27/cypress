Feature: Login
  Scenario Outline: Login to test environment of http://wolf.test.datatist.cn/
    Given User is at the login page
    When User enters username as '<username>' and password as '<password>'
    And User clicks on login button
    Then  User is able to see the page"product center"
    Examples:
      | username                 | password |
      | analyzer@datatist.com    | abcd1234 |
