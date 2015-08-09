Template.bathrooms.helpers({
  bathroomList: function() {
    var loc = Geolocation.latLng();
    return Bathrooms.find();
  },
});

Template.indBathroom.helpers({
  selectedMarkerStyle: function() {
    console.log(this._id);
    return  Session.equals('selectedMarker', this._id) ? 'active' : '';
  }
});
