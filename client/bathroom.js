Template.bathroom.helpers({
  inQueue: function() {
    var queue = Reservations
      .find({bathroomId: this._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());
    return position !== -1;
  },
  positionInQueue: function() {
    var queue = Reservations
      .find({bathroomId: this._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());
    var queueLength = Reservations.find({ bathroomId: this._id }).count();
    if (queueLength === 0) {
      return "There's no line!";
    } else if (position === 0) {
      return "It's your turn!";
    } else if (position === -1) {
      return "You're not in line...";
    }  else {
      return "You are " + (position + 1) + " out of " + queueLength;
    }
  }
});

Template.bathroom.onRendered(function() {
  Tracker.autorun(function() {
    var queue = Reservations
      .find({bathroomId: this.data._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());

    if (position === 0) {
      Router.go("bathroom.inUse", { _id: this.data._id });
    }
  }.bind(this));
});
