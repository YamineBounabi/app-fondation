Template.admin.helpers({
  questions: function(){
    return Questions.find({}, {sort: {dateAdded: -1}});
  },
  nbquestions: function(){
    return Questions.find({}, {sort: {dateAdded: -1}}).count();
  },
  valeursreponses: function(){
    var html = "";
    for(i=1;i<5;i++){
      html += "<option value='"+i+"'>"+i+"</option>";
    }
    return html;
  },
  categories: function(){
    var tab = ["fondation","fun","simplon","culture code","random"];
    var html = "";
    for(i in tab){
      html += "<option value='"+tab[i]+"'>"+tab[i]+"</option>";
    }
    return html;
  }
});

Template.admin.events({
  "submit #addquestion": function(event, template){
    console.log("jhk");
      event.preventDefault();

      var tabAnswers = [];
      for (i=0; i < event.target.elements["answers[]"].length; i++){
        tabAnswers.push(event.target.elements["answers[]"][i].value);
      }

      var objQuestion = {
        question : event.target.question.value,
        validanswer: event.target.validanswer.value,
        answers : tabAnswers,
        category : event.target.category.value,
        dateAdded : new Date()
      }

      Questions.insert(objQuestion);

      document.getElementById("addquestion").reset();
  },
  "click .delete": function(event){
    event.preventDefault;
    var elt = event.target;
    Questions.remove($(elt).data("id"));
  },
  "click .deleteAllSessions": function(event){
    //Remove all users
    Meteor.call("removeAllUsers");
  }
});
