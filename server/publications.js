// TODO: Make bathroom list only show first 10 nearby bathrooms
Meteor.publish({
  'nearbyBathrooms': function(lon, lat) {
    if (!lon && !lat) {
      return [];
    }
    return Bathrooms.find({ "loc.coordinates" : { $near : [lon, lat] } })
  }
});
