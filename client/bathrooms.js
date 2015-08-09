Template.bathrooms.helpers({
  bathroomList: function() {
    return Bathrooms.find();
  },
});

Template.bathrooms.events({
  'click .addBathroom': function(event) {
    Router.go('bathroom.create');
  }
})

Template.indBathroom.helpers({
  selectedMarkerStyle: function() {
    return  Session.equals('selectedMarker', this._id) ? 'active' : '';
  },
});

Template.indBathroom.onRendered(function() {
  startBathroomCountdown(this.data._id)
});

