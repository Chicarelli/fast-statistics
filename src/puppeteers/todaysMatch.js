const puppeteer = require('puppeteer');

const todaysMatch = async(championship) => {
  const browser = await puppeteer.launch({
    headless: true, 
    defaultViewport: null
  });
  try{
  const page = await browser.newPage();
  page.setDefaultTimeout(3000);
  await page.goto('https://www.google.com');
  await page.waitForSelector(`input[type="text"]`)
  await page.click(`input[type="text"]`);

  await page.keyboard.type(`${championship}`);
  await page.keyboard.press('Enter');
  await page.waitForSelector(`#sports-app > div > div:nth-child(2) > div > div > div > ol > li:nth-child(3)`);

  await page.click('#sports-app > div > div:nth-child(2) > div > div > div > ol > li.imso-hide-overflow.tb_l.GSkImd.tb_st');

  await page.waitForSelector('td.GOsQPe.imspo_mt__wt > div > div > div > div.imspo_mt__pm-inf.imspo_mt__pm-infc.imspo_mt__date.imso-medium-font');

  let todaysMatch = await page.$$eval('td.GOsQPe.imspo_mt__wt > div > div > div > div.imspo_mt__pm-inf.imspo_mt__pm-infc.imspo_mt__date.imso-medium-font', spans => { 
    spanMatchesToday = spans.filter(span => {
      return span.textContent === 'Hoje';
    })

    const matches = spanMatchesToday.map(item => {
     const tr =  item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    
     const match = {
       homeTeam: tr.childNodes[4].textContent,
       awayTeam: tr.childNodes[5].textContent
     }

     return match
    });

    return matches;
  })

  await browser.close();

  return todaysMatch;

} catch(error){
  await browser.close();
  console.log('erro em: ', championship);
  return [];
}
}

module.exports = todaysMatch;