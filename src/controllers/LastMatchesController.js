const lastMatches = require('../puppeteers/getTeamLastMatches');
const Last_matches = require("../models/Last_matches");
const MatchTeams = require('../models/Match_teams');
const startOfDay = require("date-fns/startOfDay");

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const controller = async() => {
  const data = await MatchTeams.findAll({
    where: {
      createdAt : {
        [Op.gte]: startOfDay(new Date())
      }
    }
  })

  console.log(data);

  for(const i in data){
    let team = data[i];

    const last_matches = await lastMatches(team.name);
    saveLastMatches(last_matches, team.id, team.match_id, team.name);

  }

  return;
}

const saveLastMatches = (lastMatches, matchTeamsId, matchId, teamName) => {
  lastMatches.forEach(async match => {
    let isHomeTeam =  match.teams.homeTeam == teamName? true: false;
    let result = 'W';

    if(isHomeTeam && Number(match.goals.awayTeam) > Number(match.goals.homeTeam)){
      result = 'L';
    }else if(Number(match.goals.awayTeam) == Number(match.goals.homeTeam)){
      result = 'D';
    }
    else if(!isHomeTeam && Number(match.goals.homeTeam) > Number(match.goals.awayTeam)){
      result = 'L';
    }

    const lastMatch = Last_matches.build({
      match_id: matchId,
      team_id: matchTeamsId,
      situation: isHomeTeam ? 'home' : 'away',
      goalsMade: isHomeTeam ? match.goals.homeTeam : match.goals.awayTeam,
      goalsTaken: isHomeTeam ? match.goals.awayTeam : match.goals.homeTeam,
      corners: isHomeTeam ? match.corners.homeCorners : match.corners.awayCorners,
      cornersAgainst: isHomeTeam ? match.corners.awayCorners : match.corners.homeCorners,
      yellowCard: isHomeTeam ? match.yellowCards.homeYellowCards : match.yellowCards.awayYellowCards,
      redCard: isHomeTeam? match.redCards.homeRedCards : match.redCards.awayRedCards,
      faultsMade: isHomeTeam ? match.faults.homeFaults : match.faults.awayFaults,
      faultsTaken: isHomeTeam ? match.faults.awayFaults : match.faults.homeFaults,
      result: result,
      teamName: isHomeTeam ? match.teams.homeTeam : match.teams.awayTeam,
      teamAgainst: isHomeTeam ? match.teams.awayTeam : match.teams.homeTeam,
    });

   await  lastMatch.save();
  })

}

module.exports = controller;