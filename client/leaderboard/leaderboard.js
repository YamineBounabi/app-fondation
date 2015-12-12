Template.leaderboard.helpers({
  users: function(){
    return Meteor.users.find({}, {sort: {'profile.score': -1}}).fetch();
  },
  lastGoodAnswer: function(){
    return Meteor.users.findOne({}, {sort: {'profile.lastgoodanswer': -1}}).profile.name;
  }
});
