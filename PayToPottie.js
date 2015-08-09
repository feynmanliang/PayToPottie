Reservations = new Mongo.Collection('reservations');
Bathrooms = new Mongo.Collection('bathrooms');
if (Meteor.isServer) {
  Bathrooms._ensureIndex({"loc" : "2dsphere"});
}
// TODO: only publish images for current bathroom
BathroomImages = new FileCollection('bathroomImages', {
  resumable: true,   // Enable built-in resumable.js upload support
  http: [{
    method: 'get',
    path: '/:md5',  // this will be at route "/gridfs/bathroomImages/:md5"
    lookup: function (params, query) {  // uses express style url params
      return { md5: params.md5 };       // a query mapping url to bathroomImages
    }
  }]
});

CRON_INTERVAL = 'every 5 seconds';
BATHROOM_TIME_SECONDS = 10;
COUNTDOWN_TIME_MILLIS = 200;

// TODO: make this a pub-sub so bathrooms that are added are reactively updated

if (Meteor.isClient) {
  UI.registerHelper('formatTime', function(context, options) {
    if(context)
      return moment(context).format('MM/DD/YYYY, hh:mm');
  });
}
