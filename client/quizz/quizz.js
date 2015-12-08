Template.quizz.helpers({
  randomquizz: function(){
    var query = {};
    var n = Questions.find(query).fetch().length;
    var r = Math.floor(Math.random() * n);
    var randomElement = Questions.find({},{limit: 1, skip: r}).fetch();
    console.log(randomElement[0]);
    return randomElement[0];
  }
});
