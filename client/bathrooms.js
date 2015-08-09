Template.bathrooms.helpers({
  nearby: function() {
    var loc = Geolocation.latLng();
    return Bathrooms.find();
  }
});
