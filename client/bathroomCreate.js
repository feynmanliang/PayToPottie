Template.bathroomCreate.events({
  'submit .newBathroom': function(event) {
    event.preventDefault();
    var bathroom = event.target;
    // TODO: change to current user's id
    var owner = Meteor.userId() || undefined;
    var geocode = new google.maps.Geocoder();
    geocode.geocode({
      address: bathroom.location.value
    }, function(geocodeResult) {
      var latLng = geocodeResult.shift().geometry.location
      var bathroomId = Bathrooms.insert({
        // TODO: GPS coords for bathroom
        // TODO: Photos for bathrooms
        name: bathroom.name.value,
        description: bathroom.description.value,
        price: parseInt(bathroom.price.value),
        owner: owner,
        loc: {
          type : "Point",
          coordinates : [
            latLng.K,
            latLng.G
          ]
        }
      });
      Router.go('/bathroom/' + bathroomId);
    });
  }
})
