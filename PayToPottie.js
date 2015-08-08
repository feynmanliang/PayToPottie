Reservations = new Mongo.Collection('reservations');
Bathrooms = new Mongo.Collection('bathrooms');

if (Meteor.isClient) {
  Template.body.helpers({
    bathrooms: function() {
      return Bathrooms.find();
    }
  });
}
