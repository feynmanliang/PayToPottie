Template.gateway.helpers({
  showRegister: function(){
    if (Session.equals('showRegister', true)){
      return true;
    }
},
  loggedIn: function() {
    //returns a boolean
    if (Meteor.user()) {
      return true;
    }
    return false;
  },
  showLogin: function() {
    if (Session.equals('showRegister', false)) {
      return true;
    }
  }
});
