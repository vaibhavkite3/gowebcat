
module.exports = {
  'Test For Login Success': function (client) {
    client
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .click('[name="loginlink"]')
      .waitForElementVisible('input[name="email"]', 30000)
      .waitForElementVisible('input[name="password"]', 30000)
      .assert.visible('input[name="email"]')
      .assert.visible('input[name="password"]')
      .setValue('input[name="email"]', 'test')
      .setValue('input[name="password"]', 'test')
      .click('button[name="btnlogin"]')
      .pause(5000)
      .end()
  }
}
