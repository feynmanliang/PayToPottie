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
    console.log("selected marker", this._id);
    if(Session.equals('selectedMarker', this._id)) {
      console.log("activate", this._id);
      $('.panel-collapse').collapse('hide');
      $('#collapse-' + this._id).collapse('show');
      return 'marked';
    } else {
      return '';
    }
  },
  abc: function() {
    console.log("Abc");
  }
});

// $('.panel-collapse').collapse('hide');
Template.indBathroom.events({
  'click .bathroom-item': function(event) {
    var bathroomId = event.currentTarget.id;
    console.log("You clicked on", bathroomId);
    Session.set("selectedMarker", bathroomId);
  }
})
