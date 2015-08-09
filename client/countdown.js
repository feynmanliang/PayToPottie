Template.countdown.helpers({
  percentSinceLoad: function() {
    var bathroomId = this._id;
    var start = Session.get('countdownStart-' + bathroomId);
    var countdown = Session.get('countdown-' + bathroomId) || 0;
    if (start === undefined && countdown !== 0) {
      Session.set('countdownStart-' + bathroomId, countdown);
    }
    return (((countdown / start) || 0) * 100).toFixed(2) + "%";
  }
})

Template.countdown.onRendered(function() {
  Tracker.autorun(function() {
    Reservations.count(); // add reactive dependency
    if (this.data && typeof(this.data) !== "undefined") {
      startBathroomCountdown(this.data._id);
    }
  });
});
