module.exports = Retrieval
var fetch = require('node-fetch')

function Retrieval () {
  this.liveURL = 'http://www.nfl.com/liveupdate/scorestrip/ss.json'
  this.byWeekUrl = 'http://www.nfl.com/ajax/scorestrip'

  Retrieval.prototype.getResults = async (week='current', seasonType, season) => {
    if(week === 'current') {
      return fetch(this.liveURL);
    } else {
      return fetch(`${this.byWeekUrl}?season=${season}&seasonType=${seasonType}&week=${week}`)
    }
  }

  Retrieval.prototype.parseResults = function (json) {
    return json.gms.map(toSummedScores)

    function toSummedScores (game) {
      return {
        totalscore: game.hs + game.vs,
        host: game.h,
        visitor: game.v,
        formatted: `${game.v} at ${game.h}: ${game.hs + game.vs} points in total`
      }
    }
  }
}
