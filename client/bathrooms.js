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
  hovereMarkerStyle: function() {
    return Session.equals('hoveredMarker', this._id) ? 'active' : '';
  }
});

Template.indBathroom.events({
  'click .bathroom-item': function(event) {
    toggleBathroomPanelBody(event.currentTarget.id);
  }
})

Template.indBathroom.onRendered(function() {
  startBathroomCountdown(this.data._id)
});
