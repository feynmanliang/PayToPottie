Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(user, password)
  },
  'click .register': function(event){
    event.preventDefault();
    Session.set('showRegister', true);
  }
});
