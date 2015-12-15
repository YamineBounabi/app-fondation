Template.home.events({
  "click a.disconnect": function(event, template){
    Session.clear("username");
    Session.keys = {};
    try{
      Meteor.users.remove({_id: Meteor.userId()});
    }catch(e){
      console.log(e);
    }
    Router.go("/");
  }
});
