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
    console.log(this._id);
    return  Session.equals('selectedMarker', this._id) ? 'active' : '';
  }
});
