Template.queue.helpers({
  listReservations: function() {
    return Reservations.find({}, {sort: { createdAt: 1}});
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

Template.joinQueue.events({
    "click": function(event) {
        event.preventDefault();
        Reservations.insert({
          userId: Math.floor(Math.random() * 1000) + 1,
          createdAt: moment().valueOf(),
          status: "Active"
        });
    }
})
