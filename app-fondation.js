/////////////////////////
// main app-fondation //
///////////////////////

Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");

if (Meteor.isClient) {

  //Subscribe
  Meteor.subscribe("questionsAndAnswers", {
    onReady: function(){
      $("#loader").hide();
    }
  });

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
    console.log("Rendering: " + Router.current().route.getName());

    //Check if logged in before getting into the app (except for admin where no login is required)
    var loggedin = Session.get("username");

    if (Router.current().route.getName() != "admin" && Router.current().route.getName() != "leaderboard" && ! loggedin) {
      $("body").addClass("login");
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

    Questions.allow({
      insert: function(){
        return true;
      },
      update: function(){
        return true;
      },
      remove: function(){
        return true;
      }
    });

    Answers.allow({
      insert: function(){
        return true;
      },
      update: function(){
        return true;
      },
      remove: function(){
        return true;
      }
    });

    Meteor.publish("questionsAndAnswers", function () {
      return [
        Questions.find({}),
        Answers.find({})
      ];
    });

  });

  Meteor.methods({
    insertAnswer: function(userName,questionId){
      Answers.insert({answeredId: questionId, username: userName, answerTime: new Date() });
    },
    motorup:function(){
      console.log("Motor up!");
      try{
        var result = HTTP.get(Meteor.settings.motorUrl + "up", function(){
          console.log("HTTP up requested...");
          console.log(result.content);
        });
      }catch(e){
        console.log(e);
      }
    },
    motordown:function(){
      console.log("Motor down!");
      try{
        var result = HTTP.get(Meteor.settings.motorUrl + "down", function(){
          console.log("HTTP down requested...");
          console.log(result.content);
        });
        console.log(result.content);
      }catch(e){
        console.log(e);
      }
    },
    removeAnswers: function(){
      Answers.remove({});
    }
  });
}
