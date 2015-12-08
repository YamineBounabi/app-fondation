Template.admin.helpers({
  questions: function(){
    return Questions.find({});
  },
  valeursreponses: function(){
    var html = "";
    for(i=1;i<5;i++){
      html += "<option value='"+i+"'>"+i+"</option>";
    }
    return html;
  }
});

Template.admin.events({
  "submit #addquestion": function(event, template){
      event.preventDefault();

      var tabAnswers = [];
      for (i=0; i < event.target.elements["answers[]"].length; i++){
        tabAnswers.push(event.target.elements["answers[]"][i].value);
      }

      var objQuestion = {
        question : event.target.question.value,
        validanswer: event.target.validanswer.value,
        answers : tabAnswers
      }

      Questions.insert(objQuestion);
  },
  "click .delete": function(event){
    event.preventDefault;
    var elt = event.target;
    Questions.remove($(elt).data("id"));
  }
});
