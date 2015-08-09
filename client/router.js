Router.configure({
    layoutTemplate: 'main'
});

Router.route('/bathroom/edit/:_id', {
  name: 'bathroomCreate',
  template: 'bathroomCreate',
  data: function() {
    return Bathrooms.findOne({_id: this.params._id});
  },
  subscriptions: function() {
    return Meteor.subscribe('bathroom', this.params._id);
  }
});

Router.route('/bathroom/new', function() {
  this.render('bathroomCreate')
});

Router.route('/bathroom/:_id', {
  name: 'bathroom',
  template: 'bathroom',
  data: function() {
    return Bathrooms.findOne({_id: this.params._id})
  },
  subscriptions: function() {
    return [
      Meteor.subscribe('bathroom', this.params._id),
      Meteor.subscribe('reservationsFor', this.params._id)
    ];
  }
});

Router.route('/bathroom', {
  name: 'bathrooms',
  template: 'bathrooms',
  subscriptions: function() {
    // TODO: support maxDistance
    var loc = Geolocation.latLng();

    return [
      Meteor.subscribe('reservations'),
      Meteor.subscribe('nearbyBathrooms', loc ? loc.lng : 0.1, loc ? loc.lat : 0.1)
    ];
  },
  after: function (){
    Session.set('logState', "inactive");
    Session.set('bathroomState', "active");
  }

});

Router.route('/imageUpload',{
  template: 'imageUpload'
});

Router.route('/',{
  template: 'gateway',
  after: function (){
    Session.set('logState', "active");
    Session.set('bathroomState', "inactive");
    Session.set('showRegister', false);
  }
});

