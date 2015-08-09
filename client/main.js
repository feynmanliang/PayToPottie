Template.main.helpers({
  'click .logout-button': function(event) {
    event.preventDefault();
    Meteor.logout();
    Session.set('showRegister', false);
  }
});
