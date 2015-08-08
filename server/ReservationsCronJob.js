// Cron job to update queue
SyncedCron.add({
  name: 'Updates Reservations queues',
  schedule: function(parser) {
    return parser.text('every 5 seconds');
  },
  job: function() {
    var reservationsByCreatedAt =
      Reservations.find({}, { $orderby: { createdAt: -1} });
    if (reservationsByCreatedAt.length !== 0) {
      var reservationToRemove = reservationsByCreatedAt.fetch()[0];
      console.log("Removing " + reservationToRemove._id);
      Reservations.remove(reservationToRemove._id);
    } else {
      console.log("No reservations to remove!");
    }
  }
});
SyncedCron.start();

