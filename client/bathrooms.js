Template.bathrooms.helpers({
  bathroomList: function() {
    var loc = Geolocation.latLng();
    return Bathrooms.find();
  }
});

Template.bathrooms.events({
  'click .addBathroom': function(event) {
    Router.go('/bathroom/new');
  }
})
