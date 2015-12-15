/////////////////////////
// main app-fondation //
///////////////////////

Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {

  //Routage
  Router.route('/', function () {
    this.render('home');
  });

  Router.route('/quizz');
  Router.route('/admin');
  Router.route('/leaderboard');
  Router.route('/don');

  Router.route('/goodanswer');
  Router.route('/badanswer');

  //Check if user has entered his name before arriving (except admin)
  Router.onBeforeAction(function () {
    //Before rendering!
    console.log("Welcome user " + Meteor.userId());

    //Check if logged in before getting into the app (except for admin where no login is required)
    if (Router.current().route.getName() != "admin" && Router.current().route.getName() != "leaderboard" && ! Session.get("username")) {
      $("body").addClass("login");
      $("#loading").hide();
      this.render('login');
    }else{
      $("body").addClass(Router.current().route.getName());
      this.next();
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.users.allow({
      remove: function(userId, doc) {
        // JUST FOR TESTING - NEVER DO THIS IN PRODUCTION
        return true;
      }
    });

    AccountsGuest.enabled = true;
    AccountsGuest.anonymous = true;

  });

  Meteor.methods({
    motorup:function(){
      console.log("Motor up!");
      try{
        var result = HTTP.get(Meteor.settings.motorUrl + "up", {});
        console.log(result.content);
      }catch(e){
        console.log(e);
      }
    },
    motordown:function(){
      console.log("Motor down!");
      try{
        var result = HTTP.get(Meteor.settings.motorUrl + "up", {});
        console.log(result.content);
      }catch(e){
        console.log(e);
      }
    },
    removeAllUsers: function(){
      Meteor.users.remove({});
    }
  });
}
