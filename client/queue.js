Template.queue.helpers({
  listReservations: function() {
    return Reservations.find({}, { $orderby: { createdAt: -1} });
  }
});

Template.queueItem.helpers({
  createdTime: function() {
    return moment(this.createdAt).format();
  }
});
