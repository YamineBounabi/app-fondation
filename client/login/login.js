Template.login.events({
  "click #submit": function(event, template){
     //creation d'un user
     if(! Session.get("username") && $("#username").val()){

       var userNameVal = $("#username").val();
       Session.setPersistent("username", userNameVal);
       Session.setPersistent("tabanswered",[]);

       Router.go("/");
     }
  },
  "keypress input": function(e){
    if (e.charCode == 13) {
      e.preventDefault();
      $("#submit").click();
    }
  }
});
