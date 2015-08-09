Template.queue.helpers({
  listReservations: function() {
    return Reservations.find({bathroomId: this._id}, {sort: { createdAt: 1}});
  }
});

Template.queueItem.helpers({
  createdTime: function() {
    return moment(this.createdAt).format();
  },
  beganProcessingTime: function() {
    if (this.beganProcessingAt !== undefined) {
      return moment(this.beganProcessingAt).format();
    } else {
      return "n/a";
    }
  }
});
