Reservations = new Mongo.Collection('reservations');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  this.joined = true;
  Template.body.helpers({
      queue: [
          { user: "User 1"},
          { user: "User 2"},
          { user: "User 3"},
          { user: "User 4"},
          { user: "User 5"}
      ]
  });
  Template.body.heleprs({
      joined: true
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
