Template.bathroom.onRendered(function() {
  // Resets countdown start to queue length when
  // 1. page load
  // 2. new item added to queue
  if (this.data && typeof(this.data) !== "undefined") {
    startBathroomCountdown(this.data._id);
  }
});

Template.bathroom.helpers({
  positionInQueue: function() {
    // TODO
    var queue = Reservations
      .find({bathroomId: this._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());
    var queueLength = Reservations.find({ bathroomId: this._id }).count();
    if (queueLength === 0) {
      return "There's no line!";
    } else if (position == -1) {
      return "You're not in line...";
    }  else {
      return "You are " + (position + 1) + " out of " + queueLength;
    }
  },
  percentSinceLoad: function() {
    var bathroomId = this._id;
    var start = Session.get('countdownStart-' + bathroomId);
    var countdown = Session.get('countdown-' + bathroomId) || 0;
    if (start === undefined && countdown !== 0) {
      Session.set('countdownStart-' + bathroomId, countdown);
    }
    return (((countdown / start) || 0) * 100).toFixed(2) + "%";
  }
});
