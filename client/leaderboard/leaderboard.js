Template.leaderboard.helpers({
  users: function(){
    //On compte les réponses pour le leaderboard

    var tabAnswers = Answers.find({}).fetch();
    var tabResults = [];
    var tabgrouped = _.groupBy(_.pluck(tabAnswers, 'username'));

    for (i in tabgrouped) {
      tabResults.push({username : i, score : tabgrouped[i].length});
    }

    tabResults.sort(function(a, b) {return b.score - a.score})

    return tabResults;
  },
  lastGoodAnswer: function(){
    return '<span class="animated linear bounceInRight">' + Answers.findOne({}, {sort: {'answerTime': -1}}).username + '</span>';
  }
});
