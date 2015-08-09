Template.inUse.helpers({
  stillActive: function() {
    var res = Reservations.findOne({
      bathroomId: this._id,
      userId: Meteor.userId()
    });
    return !!res;
  },
  endTime: function() {
    var res = Reservations.findOne({
      bathroomId: this._id,
      userId: Meteor.userId()
    });
    if (res) {
      return (
        moment(
          moment(res.beganProcessingAt)
          + moment.duration(BATHROOM_TIME_SECONDS, 'seconds')
      ).format('hh:mm'));
    } else {
      return "";
    }
  }
});

Template.inUse.events({
  'click .finished': function() {
    Router.go('bathrooms');
  }
})

Template.inUse.onRendered(function() {
  if (this.data && typeof(this.data) !== "undefined") {
    startBathroomCountdown(this.data._id);
  }

  Tracker.autorun(function() {
    if (!this.data) {
      Router.go('thankYou');
    }
  });
});
