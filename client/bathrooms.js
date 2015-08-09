Template.bathrooms.helpers({
  bathroomList: function() {
    var loc = Geolocation.latLng();
    return Bathrooms.find();
  }
});

