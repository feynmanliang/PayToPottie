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
    // Bind markers reactively to Bathrooms
    Bathrooms.find().observe({
      added: function(bathroom) {
        // Create marker
        var marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          draggable: false,
          map: map.instance,
          position: new google.maps.LatLng(
            bathroom.loc.coordinates[1],
            bathroom.loc.coordinates[0]
          ),
          id: bathroom._id
        });

        // Handle marker hovering
        google.maps.event.addListener(marker, 'mouseover', function(event) {
          Session.set('hoveredMarker', bathroom._id);
        });
        // Handle marker clicking
        google.maps.event.addListener(marker, 'click', function(event) {
          toggleBathroomPanelBody(bathroom._id);
        });
      },
      changed: function(newBathroom, oldBathroom) {
        markers[newBathroom._id].setPosition({
          lat: newBathroom.loc.coordinates[1],
          lng: newBathroom.loc.coordinates[0]
        });
      },
      removed: function(oldBathroom) {
        // Remove the marker from the map
        markers[oldBathroom._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
          markers[oldBathroom._id]);
      }
    });
  });
});
