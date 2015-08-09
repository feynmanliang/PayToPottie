Router.configure({
    layoutTemplate: 'main'
});

Router.route('/bathroom/new', {
  name: 'bathroom.create',
  template: 'bathroomCreate'
});

Router.route('/bathroom/edit/:_id', {
  name: 'bathroom.edit',
  template: 'bathroomCreate',
  data: function() {
    return Bathrooms.findOne({_id: this.params._id});
  },
  subscriptions: function() {
    return Meteor.subscribe('bathroom', this.params._id);
  }
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
    var loc = Location.getReactivePosition();

    return [
      Meteor.subscribe('reservations'),
      loc ?
        Meteor.subscribe('nearbyBathrooms', loc.longitude, loc.latitude) :
        undefined
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

Router.route('/about',{
  template: 'About'
});


Router.route('/',{
  template: 'gateway',
  after: function (){
    Session.set('logState', "active");
    Session.set('bathroomState', "inactive");
    Session.set('showRegister', false);
  }
});

