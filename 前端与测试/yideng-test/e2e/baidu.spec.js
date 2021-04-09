const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('大红袍', Key.RETURN);
    await driver.wait(until.titleIs('大红袍_百度搜索'));
  } finally {
    await driver.quit();
    //一定要退出
  }
})();