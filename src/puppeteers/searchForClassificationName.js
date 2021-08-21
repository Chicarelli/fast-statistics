const puppeteer = require('puppeteer');

const searchForClassificationName =  async(name, classification) => {

  try{
  const browser = await puppeteer.launch({headless: true, defaultViewport: null});
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.waitForSelector(`input[type="text"]`)
  await page.click(`input[type="text"]`);

  await page.keyboard.type(`${name} ${classification}`);
  await page.keyboard.press('Enter');
  await page.waitForSelector(`#sports-app > div > div:nth-child(2) > div > div > div > ol > li:nth-child(3)`);

  await page.click(`#sports-app > div > div:nth-child(2) > div > div > div > ol > li:nth-child(3)`);

  await page.waitForSelector('.Jzru1c');

  const realName = await page.$$eval('div > table > tbody > tr.imso-medium-font.S9IdSb.o43uac.ivCkGf', (selectedDiv) => {
    return selectedDiv[0].childNodes[2].textContent;
  })

  await browser.close();

  return realName;
  } catch (error) {
    await browser.close();
    return null
  }
}

module.exports = searchForClassificationName;