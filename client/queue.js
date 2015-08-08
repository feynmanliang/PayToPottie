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
