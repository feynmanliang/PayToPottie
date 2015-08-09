Template.bathroomCreate.events({
  'submit .newBathroom': function(event) {
    event.preventDefault();
    var bathroom = event.target;
    // TODO: change to current user's id
    var owner = Meteor.userId() || undefined;
    var geocode = new google.maps.Geocoder();

    geocode.geocode({
      address: bathroom.address.value
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
        address: bathroom.address.value,
        active: bathroom.active.checked,
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
      if(this._id !== undefined)
        var bathroomId = Bathrooms.update({_id: this._id}, bathroomToSave);
      else
        var bathroomId = Bathrooms.insert(bathroomToSave);
      Router.go('/bathroom/' + bathroomId);
    });
  }
});

Template.bathroomCreate.isNew = function(id) {
  return id === null;
}
