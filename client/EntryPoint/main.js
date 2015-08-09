Template.main.events({
  'click .logout-button': function(event) {
    event.preventDefault();
    Meteor.logout();
    Session.set('showRegister', false);
  }
});

Template.main.helpers({
  loggedIn: function() {
    if (Meteor.user()) {
      return true;
    }
  },
  loggedOut: function() {
    if (Meteor.user() === null) {
      return true;
    }
  }
});

