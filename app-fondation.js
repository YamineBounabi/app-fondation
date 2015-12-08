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

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
