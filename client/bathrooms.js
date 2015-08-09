Template.bathrooms.helpers({
  bathroomList: function() {
    var loc = Geolocation.latLng();
    return Bathrooms.find();
  },
});

Template.bathrooms.events({
  'click .addBathroom': function(event) {
    Router.go('/bathroom/new');
  }
})

Template.indBathroom.helpers({
  selectedMarkerStyle: function() {
    return  Session.equals('selectedMarker', this._id) ? 'active' : '';
  }
});
