var MAP_ZOOM = 15;

Template.directions.helpers({
  mapOptions: function() {
    var pos = Location.getLastPosition();
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(pos.latitude, pos.longitude),
        zoom: MAP_ZOOM
      };
    }
  }
});

Template.directions.onRendered(function() {
  var self = this;
  Tracker.autorun(function() {
    if (this.data) {
      var pos = Location.getLastPosition();
      var lonLat = this.data.loc.coordinates;
      GoogleMaps.ready('directionsMap', function(map) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map.instance);

        var start = new google.maps.LatLng(pos.latitude, pos.longitude);
        var end = new google.maps.LatLng(lonLat[1], lonLat[0]);
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      });
    }
  }.bind(this));
});
