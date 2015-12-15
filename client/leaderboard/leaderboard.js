Template.leaderboard.helpers({
  users: function(){
    //return only valid users (i.e. that have a username)
    return Meteor.users.find({'profile.name' : {$exists: 1}}, {sort: {'profile.score': -1}}).fetch();
  },
  lastGoodAnswer: function(){
    if(Meteor.users.findOne({}, {sort: {'profile.lastgoodanswer': -1}}).profile.name){
      return '<span class="animated linear bounceInRight">' + Meteor.users.findOne({}, {sort: {'profile.lastgoodanswer': -1}}).profile.name + '</span>';
    }else{
      return null;
    }
  }
});
