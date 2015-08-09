Template.bathrooms.helpers({
  bathroomList: function() {
    var distances = Session.get('distanceMatrix');
    if (distances) {
      var bathroomsWithDistances = Bathrooms.find({}, {limit: 10}).map(function(elem, i) {
        elem.distance = distances.rows[0].elements[i].distance.value;
        return elem
      });
      console.log(_.sortBy(bathroomsWithDistances, function(elem) {
        return elem.distance;
      }));
      var sorted = _.sortBy(bathroomsWithDistances, function(elem) {
        return elem.distance;
      });
      return _.map(sorted, function(e, i) {
        e.rank = i + 1;
        return e;
      });
    } else {
      return Bathrooms.find({}, {limit: 10});
    }
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
  'click .bathroom-panel': function(event) {
    toggleBathroomPanelBody(event.currentTarget.id);
  }
})

Template.indBathroom.onRendered(function() {
  startBathroomCountdown(this.data._id)
});
