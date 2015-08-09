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


Template.queueItem.events({
  // Should be used only for removing others from a queue you own
  "click .remove-queue-item": function(event) {
    var reservation = Reservations.findOne(event.target.id);
    var bathroom = Bathrooms.findOne(this.bathroomId);
    if (bathroom.owner === Meteor.userId()) {
      Reservations.remove(event.target.id);
    }
  }
})
