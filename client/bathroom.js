Template.bathroom.onRendered(function() {
  Session.set('pageloadStart-' + this.data._id, undefined);
  if (typeof(this.data) !== "undefined") {
    startBathroomCountdown(this.data._id);
  }
});

Template.bathroom.helpers({
  percentSinceLoad: function() {
    var bathroomId = this._id;
    var start = Session.get('pageloadStart-' + bathroomId);
    var countdown = Session.get('countdown-' + bathroomId) || 0;
    if (start === undefined) {
      Session.set('pageloadStart-' + bathroomId, countdown);
    }
    return (((countdown / start) || 0) * 100).toFixed(2) + "%";
  }
});
