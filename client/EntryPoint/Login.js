Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    Session.set('loginError', false);
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.logoutOtherClients();
    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        Session.set('loginError',true);
        throw Error(error);
      } else {
      Router.go('/bathroom');
      }
    })
  },
  'click .register': function(event){
    event.preventDefault();
    Meteor.logoutOtherClients();
    Session.set('showRegister', true);
  }
});

Template.login.helpers({
  loginErr: function() {
    return Session.get('loginError');
  }
});

