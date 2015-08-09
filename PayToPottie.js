Reservations = new Mongo.Collection('reservations');
Bathrooms = new Mongo.Collection('bathrooms');
if (Meteor.isServer) {
  Bathrooms._ensureIndex({"loc.coordinates" : "2d"});
}

CRON_INTERVAL = 'every 5 seconds';
BATHROOM_TIME_SECONDS = 10;

// TODO: make this a pub-sub so bathrooms that are added are reactively updated
Meteor.methods({
  'nearbyBathrooms': function(lon, lat) {
    if (!lon && !lat) {
      return [];
    }
    return Bathrooms.find({ "loc.coordinates" : { $near : [lon, lat] } })
  }
});


if (Meteor.isClient) {
  UI.registerHelper('formatTime', function(context, options) {
    if(context)
      return moment(context).format('MM/DD/YYYY, hh:mm');
  });
}
