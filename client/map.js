var MAP_ZOOM = 15;

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});

Template.map.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var lonLats = Bathrooms.find().map(function(elem) {
        return elem.loc.coordinates;
      });
      if (lonLats.length === 0) return;

      // If the marker doesn't yet exist, create it.
      for (var i=0; i < lonLats.length; i++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lonLats[i][1], lonLats[i][0]),
          map: map.instance
        });
      }
    });
  });
});
