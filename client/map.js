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
    google.maps.event.addListener(map.instance, 'click', function(event) {
    });

    // Create new markers reactively
    self.autorun(function() {
      Bathrooms.find().forEach(function(bathroom) {
        new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          draggable: false,
          map: map.instance,
          position: new google.maps.LatLng(
            bathroom.loc.coordinates[1],
            bathroom.loc.coordinates[0]
          ),
          id: bathroom._id
        });
      });
    });
  });
});

//Bathrooms.find().observe({
//    // TODO: handle marker clicked
//    //// This listener lets us drag markers on the map and update their corresponding bathroom.
//    //google.maps.event.addListener(marker, 'dragend', function(event) {
//    //  Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
//    //});

//    // Store this marker instance within the markers object.
//    markers[bathroom._id] = marker;
//  },
//  changed: function(newBathroom, oldBathroom) {
//    markers[newBathroom._id].setPosition({
//      lat: newBathroom.loc.coordinates[1],
//      lng: newBathroom.loc.coordinates[0]
//    });
//  },
//  removed: function(oldBathroom) {
//    // Remove the marker from the map
//    markers[oldBathroom._id].setMap(null);

//    // Clear the event listener
//    google.maps.event.clearInstanceListeners(
//      markers[oldBathroom._id]);

//    // Remove the reference to this marker instance
//    delete markers[oldBathroom._id];
//  }
//});
