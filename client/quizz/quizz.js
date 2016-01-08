Template.quizz.helpers({
  randomquizz: function(){

    //Filtrage sur les questions déjà répondues
    tabUserAnswered = Session.get("tabanswered");
    if(! tabUserAnswered){
      tabUserAnswered = [];
    }

    var query = {_id: {$nin: tabUserAnswered}};
    var n = Questions.find(query).fetch().length;
    var r = Math.floor(Math.random() * n);
    var randomElement = Questions.findOne(query,{limit: 1, skip: r});

    return randomElement;
  }
});

Template.quizz.events({
  "click #quizzAnswers li a": function(event, template){
    event.preventDefault();

     var valid = parseInt($("#question").data("valid"));
     var questionId = $("#question").data("id");
     var givenanswer =  parseInt($(event.target).data("index")) + 1; //index starts at 0

     //Check if answer is correct
     if(givenanswer === valid){
       console.log("good!");

       //Incrémentation du score (ajout de la réponse en base)
       //Answers.insert({answeredId: questionId, username: Session.get("username"), answerTime: new Date() });
       Meteor.call('insertAnswer',Session.get("username"),questionId);

       //Envoi d'un ordre à l'API (via le serveur)
       //Meteor.call("motordown");

       //Ajout de la question à la liste déjà répondu
       if(Session.get("tabanswered")){
         var tab = Session.get("tabanswered");
         tab.push(questionId);
         Session.setPersistent("tabanswered",tab);
       }else{
         Session.setPersistent("tabanswered",[questionId]);
       }

       //Affichage d'un message
       Router.go("/goodanswer");

       // TODO : INSERER REPONSE VIA SERVEUR POUR ACCELERER DELAI
       ////////

     }else{
       console.log("wrong");

       //Affichage d'un message
       Router.go("/badanswer");

     }

  }
});
