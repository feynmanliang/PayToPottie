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

Router.route('/bathroom/:_id/inUse', {
  name: 'bathroom.inUse',
  template: 'inUse',
  data: function() {
    return Bathrooms.findOne(this.params._id);
  },
  subscriptions: function() {
    return [
      Meteor.subscribe('reservationsFor', this.params._id),
      Meteor.subscribe('bathroom', this.params._id)
    ];
  }
});


Router.route('/bathroom/:_id', {
  name: 'bathroom',
  template: 'bathroom',
  onBeforeAction: function() {
    var queue = Reservations
      .find({bathroomId: this.params._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());
    if (position === 0) {
      Router.go('bathroom.inUse', { _id: this.params._id });
    } else {
      Location.locate(function(pos) {
        GoogleMaps.load();
      }, function(err) {
        console.log("Oops! There was an error", err);
      });
      this.next()
    }
  },
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
  onBeforeAction: function() {
    Location.locate(function(pos) {
      GoogleMaps.load();
    }, function(err) {
      console.log("Oops! There was an error", err);
    });
    this.next()
  },
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
    Session.set('userProf', "inactive");
    Session.set('pottyLogo', "inactive");
    Session.set('logState', "inactive");
    Session.set('bathroomState', "active");
  }

});

Router.route('/imageUpload',{
  template: 'imageUpload'
});

Router.route('/about',{
  template: 'About',
  after: function (){
    Session.set('userProf', "inactive");
    Session.set('pottyLogo', "active");
    Session.set('logState', "inactive");
    Session.set('bathroomState', "inactive");

  }
});

Router.route('/profile',{
  template: 'userProfile',
  after: function (){
    Session.set('userProf', "active");
    Session.set('pottyLogo', "inactive");
    Session.set('logState', "inactive");
    Session.set('bathroomState', "inactive");

  }
});



Router.route('/',{
  template: 'gateway',
  after: function (){
    Session.set('loginError', false);
    Session.set('userProf', "inactive");
    Session.set('logState', "active");
    Session.set('bathroomState', "inactive");
    Session.set('pottyLogo', "inactive");
    Session.set('showRegister', false);
  }
});

