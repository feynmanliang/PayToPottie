Template.logoutButton.events({
  'click .logout-button': function(event) {
    event.preventDefault();
    Meteor.logout();
    Session.set('showRegister', false);
  }
});

Template.logoutButton.helpers({
  user: function() {
    console.log(Meteor.user());

    if (Meteor.userId()) {
      return "logout, " + Meteor.user().emails[0].address;
    }
  }
});
