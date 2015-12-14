Template.login.rendered = function(){
  //if already logged -> go to /

  console.log(Meteor.userId());
}

Template.login.events({
  "click #submit": function(event, template){
     //creation d'un user
     if(! Session.get("username") && $("#username").val()){

       var userNameVal = $("#username").val();
       Session.setPersistent("username", userNameVal);

       Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": userNameVal, "profile.score" : 0, "profile.lastgoodanswer" : 0, "profile.tabanswered": [] } });

       Router.go("/");
     }
  }
});
