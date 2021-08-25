const puppeteer = require('puppeteer');

/*
 * Pesquisa no site ge.globo.com/agenda/#/todos, as partidas que acontecerão no dia e seus respectivos campeonatos. 
 * Agrupa e retorna.
 */
const todaysMatch = async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 2000,
      height: 1000
    },
    timeout: 4000,
    headless: true
  });
  try {
    
    const page = await browser.newPage();
    await page.goto("https://ge.globo.com/agenda/#/todos");
    // await page.goto("https://ge.globo.com/agenda/#/todos/25-08-2021")
    //Seletor de agrupamento dos resultados
    await page.waitForSelector('.GroupByChampionshipsstyle__GroupBychampionshipsWrapper-sc-132ht2b-0');

    const data = await page.$$eval('.GroupByChampionshipsstyle__GroupBychampionshipsWrapper-sc-132ht2b-0', async (championships) => {
      const dataGroup = [];
      await Promise.all(championships.map(async championship => {
        const groupMatches = []
        const element = championship;

        const nameOfTheChampionship = element.childNodes[0].textContent;

        const matchesEl = element.childNodes[1].childNodes;

        const matches = Object.keys(matchesEl).map(function (index) {
          const element = matchesEl[index].childNodes;
          let quantityChild = matchesEl[index].childElementCount;

          let homeTeamIndex = quantityChild == 4 ? 1 : 2;
          let awayTeamIndex = quantityChild == 4 ? 2 : 3;

          const homeTeam = element[homeTeamIndex].textContent;
          const awayTeam = element[awayTeamIndex].textContent;

          return { homeTeam, awayTeam }
        });

        let data = {
          championshipName: nameOfTheChampionship,
          matches
        }

        dataGroup.push(data);

      }));
      return dataGroup;

    });
    await browser.close();
    return data;
  } catch (error) {
    await browser.close();
  }
};

module.exports = todaysMatch;