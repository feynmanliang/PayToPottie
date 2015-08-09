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

