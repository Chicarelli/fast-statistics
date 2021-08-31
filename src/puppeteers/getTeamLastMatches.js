/* 
 * Seletores importante!
 * "constBhSGD imspo_mt__ndl-p imso-medium-font imspo_mt__match-status" div q mostra status do jogo, FIM = jogos acabados.
 * 
 * div.imspo_mt__cmd > span = textContent = data do jogo que já acabou: Dado vindo como Ter., 17/08 ou apenas a data 25/04
 * 
 * para jogos que foram há mais de uma semana.
 * RegEx para remover tudo que não for dígito. Bom para ver a data do jogo: str.replace(/[^\d]+/g,'') )
 * replace(/[^\d|\/]+/g,'');  = Permite a / no meio, para datas
 */

const puppeteer = require('puppeteer');

const searchTeamLastMatches = async (name) => {
  const browser = await puppeteer.launch({ headless: true, defaultViewport: null, timeout: 10000});
  
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(5000);
    await page.goto('https://www.google.com');
    await page.waitForSelector(`input[type="text"]`)
    await page.click(`input[type="text"]`);
    await page.keyboard.type(`Partidas ${name}`);
    await page.keyboard.press('Enter');
    await page.waitForSelector(`#sports-app > div > div:nth-child(2) > div > div > div > ol > li:nth-child(1)`);
   
    await page.click(`#sports-app > div > div:nth-child(2) > div > div > div > ol > li:nth-child(1)`);
    
    await page.mainFrame().waitForTimeout(5000);
    
    let playedGames = await page.$$('#liveresults-sports-immersive__updatable-team-matches > div > div > table > tbody > tr > td.liveresults-sports-immersive__match-tile.imso-hov.liveresults-sports-immersive__match-grid-bottom-border > div > div > div > table > tbody > tr:nth-child(3) > td.GOsQPe.imspo_mt__wt > div.imspo_mt__ms-w > div > div.imspo_mt__cmd > span');
    
    const allMatches = [];

    for (const i in playedGames){
      let element = playedGames[i];
      await page.mainFrame().waitForTimeout(1000);
      await element.click();
      try{
        await page.mainFrame().waitForTimeout(1000);
        await page.waitForSelector('#match-stats > div > div > table');
        const teamNames = await page.$$eval('div.imso_mh__tm-nm.imso-medium-font.imso_mh__tm-nm-ew > div', (spans) => {
          return {
            homeTeam: spans[0].textContent,
            awayTeam: spans[1].textContent
          }
        });
        const homeTeamGols = await page.$$eval('div > div.imso_mh__l-tm-sc.imso_mh__scr-it.imso-light-font', (results) => {
          return results[0].textContent
        })

        const awayTeamGols = await page.$$eval('div > div.imso_mh__r-tm-sc.imso_mh__scr-it.imso-light-font', (results) => {
          return results[0].textContent
        })

        const dateOfMatch = await page.$$eval('div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > div > span:nth-child(2)', (date) => {
          return date[0].textContent.replace(/[^\d|\/]+/g,'');
        })

        const homeTeamKicks = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(2) > td:nth-child(1)', (kicks) => {
          return kicks[0].textContent;
        })

        const homeGoalsKicks = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(3) > td:nth-child(1)', (goalsKicks) => {
          return goalsKicks[0].textContent;
        })

        const homeBallPossetion = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(4) > td:nth-child(1)', (ballPossession) => {
          return ballPossession[0].textContent;
        })

        const homeFaults = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(7) > td:nth-child(1)', (homeFaults) => {
          return homeFaults[0].textContent;
        })

        const homeYellowCards = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(8) > td:nth-child(1)', (yellowCards) => {
          return yellowCards[0].textContent;
        })

        const homeRedCards = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(9) > td:nth-child(1)', (redCard) => {
          return redCard[0].textContent;
        })

        const homeCorners = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(11) > td:nth-child(1)', (homeCorners) => {
          return homeCorners[0].textContent;
        })

        const awayTeamKicks = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)', (awayKicks) => {
          return awayKicks[0].textContent;
        })

        const awayGoalsKick = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)', (awayGoalsKick) => {
          return awayGoalsKick[0].textContent;
        })

        const awayBallPossetion = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)', (ballPossession) => {
          return ballPossession[0].textContent;
        })

        const awayFaults = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(7) > td:nth-child(3)', (awayFaults) => {
          return awayFaults[0].textContent;
        })

        const awayYellowCards = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)', (yellowCards) => {
          return yellowCards[0].textContent;
        })

        const awayRedCards = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(9) > td:nth-child(3)', (redCards) => {
          return redCards[0].textContent;
        })

        const awayCorners = await page.$$eval('#match-stats > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)', (awayCorners) => {
          return awayCorners[0].textContent;
        })

        //Criar objeto statistica. 
        const statistics = {
          teams: {
            homeTeam: teamNames.homeTeam,
            awayTeam: teamNames.awayTeam
          },
          goals: {
            homeTeam: homeTeamGols,
            awayTeam: awayTeamGols
          },
          date: dateOfMatch,
          kicks: {
            homeTeamKicks,
            awayTeamKicks
          },
          goalsKicks: {
            homeGoalsKicks,
            awayGoalsKick
          },
          ballPossession: {
            homeBallPossetion,
            awayBallPossetion
          },
          faults:{
            homeFaults,
            awayFaults
          },
          yellowCards: {
            homeYellowCards,
            awayYellowCards
          },
          redCards: {
            homeRedCards,
            awayRedCards
          },
          corners: {
            homeCorners,
            awayCorners
          }
        }

        allMatches.push(statistics);
        
        await page.mainFrame().waitForTimeout(1000);

        await page.goBack();

      } catch (error) {
        console.log('error', name, playedGames.length);
        await page.goBack();
      }
    }

    await browser.close();
    return allMatches;

  } catch (error) {
    console.log(error);
    await browser.close();
    return []
  }
}

module.exports = searchTeamLastMatches;
