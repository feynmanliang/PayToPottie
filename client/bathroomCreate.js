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

      if(geocodeResult.length === 0) // user didn't input location information
        return;

      var latLng = geocodeResult.shift().geometry.location
      var bathroomToSave = {
        // TODO: GPS coords for bathroom
        // TODO: Photos for bathrooms
        name: bathroom.name.value,
        description: bathroom.description.value,
        price: parseInt(bathroom.price.value),
        owner: owner,
        address: bathroom.location.value,
        loc: {
          type : "Point",
          coordinates : [
            latLng.K,
            latLng.G
          ]
        }
      }
      // if window.location is something like /bathroom/edit, then
      //  update, instead of insert
      if(window.location.pathname.indexOf('/bathroom/edit') > -1)
        var bathroomId = Bathrooms.update(bathroomToSave);
      else
        var bathroomId = Bathrooms.insert(bathroomToSave);
      Router.go('/bathroom/' + bathroomId);
    });
  }
})
