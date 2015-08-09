// TODO: Make this work
Meteor.publish({
  'nearbyBathrooms': function(lon, lat) {
    if (!lon && !lat) {
      return [];
    }
    return Bathrooms.find({ "loc.coordinates" : { $near : [lon, lat] } })
  }
});
