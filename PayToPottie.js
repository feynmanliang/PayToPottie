Reservations = new Mongo.Collection('reservations');
Bathrooms = new Mongo.Collection('bathrooms');

CRON_INTERVAL = 'every 5 seconds';
BATHROOM_TIME_SECONDS = 10;


if (Meteor.isClient) {
  Template.body.helpers({
    bathrooms: function() {
      return Bathrooms.find();
    }
  });
}
