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
  },
  bathroomState: function() {
    return Session.get('bathroomState');
  },
  logState: function() {
    return Session.get('logState');
  },
  pottyLogo: function() {
    return Session.get('pottyLogo');
  },
  userProf: function() {
    return Session.get('userProf');
  }
});

