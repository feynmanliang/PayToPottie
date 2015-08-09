Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.logoutOtherClients();
    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        throw Error(error);
      }
    })
    Router.go('/bathroom');
  },
  'click .register': function(event){
    event.preventDefault();
    Meteor.logoutOtherClients();
    Session.set('showRegister', true);
  }
});
