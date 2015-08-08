Template.queue.helpers({
  listReservations: function() {
    return Reservations.find();
  }
});

Template.queueItem.helpers({
  createdTime: function() {
    return moment(this.createdAt).format();
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
