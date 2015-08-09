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
      return moment(res.beganProcessingAt).add(BATHROOM_TIME_SECONDS, 'seconds').format('hh:mm');
    } else {
      return "";
    }
  }
});

Template.inUse.events({
  'click .finished': function() {
    var res = Reservations.findOne({
      bathroomId: this._id,
      userId: Meteor.userId()
    });
    Reservations.remove(res._id);
  },
  'click .more-time': function() {
    var res = Reservations.findOne({
      bathroomId: this._id,
      userId: Meteor.userId()
    });
    Reservations.update(res._id, {
       $set: {beganProcessingAt: moment(res.beganProcessingAt).add(15, 'seconds').valueOf()}
     });
  }
})

Template.inUse.onRendered(function() {
  var bathroom;
  if (this.data && typeof(this.data) !== "undefined") {
    bathroom = this.data;
    startBathroomCountdown(this.data._id);
  }


  Tracker.autorun(function() {
    var res = Reservations.findOne({
      bathroomId: this.data._id,
      userId: Meteor.userId()
    });
    if (!res) {
      Router.go('thankYou', { _id: this.data._id })
    }
  }.bind(this));
});
