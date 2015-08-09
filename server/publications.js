Meteor.startup(function() {
  // TODO: Make bathroom list only show first 10 nearby bathrooms
  Meteor.publish('nearbyBathrooms', function(lon, lat) {
    if (!lon && !lat) {
      return Bathrooms.find().limit(10);
    }
    return Bathrooms.find({ "loc.coordinates" : { $near : [lon, lat] } });
  });

  Meteor.publish('bathroom', function(bathroomId) {
    return Bathrooms.find({_id: bathroomId});
  });


  Meteor.publish('reservations', function() {
    return Reservations.find({});
  });

  Meteor.publish('reservationsFor', function(bathroomId) {
    return Reservations.find({bathroomId: bathroomId});
  });

  // Only publish files owned by this userId, and ignore temp file chunks used by resumable
  Meteor.publish('bathroomImages', function (clientUserId) {
    if (this.userId === clientUserId) {
      return BathroomImages.find({
        'metadata._Resumable': {
          $exists: false
        },
        'metadata._auth.owner': this.userId
      });
    } else {
      return [];
    }
  });
});
