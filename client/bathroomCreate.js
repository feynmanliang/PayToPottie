Template.bathroomCreate.events({
  'submit .newBathroom': function(event) {
    event.preventDefault();
    var bathroom = event.target;
    // TODO: change to current user's id
    var owner = Meteor.userId();
    while(google === undefined)
    google.maps.event.addListenerOnce(map, 'idle', function(){
        // do something only the first time the map is loaded
    });
    var geocode = new google.maps.Geocoder();

    geocode.geocode({
      address: bathroom.address.value
    }, function(geocodeResult) {
      if(geocodeResult.length === 0) { // user didn't input location information
        geocodeResult = [{
          'geometry': {
            'location': {
              'K': 0.1,
              'G': 0.1
            }
          }
        }];
      }

      var latLng = geocodeResult.shift().geometry.location
      console.log("lat long:", latLng);
      var bathroomToSave = {

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
      console.log("bathroom to save:", bathroomToSave);
      // if window.location is something like /bathroom/edit, then
      //  update, instead of insert
      var bathroomId = Bathrooms.upsert({_id: this._id}, bathroomToSave);
      console.log("bathroomId:", bathroomId.insertedId);
      Router.go('bathroom', {_id: bathroomId.insertedId});
    });
  }
});

Template.bathroomCreate.helpers({
  isNew: function(id) {
    console.log('id');
    console.log(id);
    return id === null;
  }
});
