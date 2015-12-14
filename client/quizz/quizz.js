Template.quizz.helpers({
  randomquizz: function(){

    //Filtrage sur les questions déjà répondues
    var tabUserAnswered = Meteor.users.findOne({_id: Meteor.userId()}).profile.tabanswered;

    var query = {};
    var n = Questions.find(query).fetch().length;
    var r = Math.floor(Math.random() * n);
    var randomElement = Questions.findOne({_id: {$nin: tabUserAnswered}},{limit: 1, skip: r});

    return randomElement;
  }
});

Template.quizz.events({
  "click #quizzAnswers li a": function(event, template){
    event.preventDefault();

     //console.log($(event.target).data("index"));
     var valid = parseInt($("#question").data("valid"));
     var questionId = $("#question").data("id");
     var givenanswer =  parseInt($(event.target).data("index")) + 1; //index starts at 0

     //Check if answer is correct
     if(givenanswer === valid){
       console.log("good!");

       //Envoi d'un ordre à l'API (via le serveur)
       Meteor.call("motordown");

       //Ajout de la question à la liste déjà répondu
       Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.tabanswered" : questionId } });

       //Affichage d'un message
       Router.go("/goodanswer");

       //Incrémentation du score
       Meteor.users.update({_id: Meteor.userId()}, {$inc: {"profile.score" : 1 } });
       Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.lastgoodanswer" : new Date() } });

     }else{
       console.log("wrong");

       //Envoi d'un ordre à l'API (via le serveur)
       Meteor.call("motorup");

       //Affichage d'un message
       Router.go("/badanswer");

     }

  }
});
