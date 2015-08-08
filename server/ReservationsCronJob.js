// Cron job to update queue
SyncedCron.add({
  name: 'Updates Reservations queues',
  schedule: function(parser) {
    // TODO: change to actual cron interval
    return parser.text('every 5 seconds');
  },
  job: function() {
    var reservationsByCreatedAt =
      Reservations.find({}, { $orderby: { createdAt: -1} });
    if (reservationsByCreatedAt.length !== 0) {
      var firstReservation = reservationsByCreatedAt.fetch()[0];
      var timeElapsed =
        moment.duration(moment() - moment(firstReservation.createdAt));

      // TODO: change to actual bathroom duration time
      if (timeElapsed > moment.duration(15, 'seconds')) {
        console.log("Removing " + firstReservation._id);
        Reservations.remove(firstReservation._id);
      }
    } else {
      console.log("No reservations to remove!");
    }
  }
});
SyncedCron.start();

