var MAP_ZOOM = 15;

Meteor.startup(function() {
  Location.locate(function(pos) {
    console.log("Got location", pos);
    GoogleMaps.load();
  }, function(err) {
    console.log("Oops! There was an error", err);
  });
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
    var bathrooms = [];
    var destinations = [];
    Bathrooms.find({}, {limit: 10}).forEach(function(bathroom) {
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

      // Add to destinations
      destinations.push(
        new google.maps.LatLng(
          bathroom.loc.coordinates[1],
          bathroom.loc.coordinates[0])
      );
      bathrooms.push(bathroom);
    });
    var pos = Location.getLastPosition();
    var origin = new google.maps.LatLng(pos.latitude, pos.longitude);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: destinations,
      travelMode: google.maps.TravelMode.WALKING
    }, function(res) {
      Session.set("distanceMatrix", {
        bathrooms: bathrooms,
        matrix: res
      });
      console.log("Set distanceMatrix", JSON.stringify(res));
    });
  });
});
