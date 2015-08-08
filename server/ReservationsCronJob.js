// Cron job to update queue
SyncedCron.add({
  name: 'Updates Reservations queues',
  schedule: function(parser) {
    // TODO: change to actual cron interval
    return parser.text(CRON_INTERVAL);
  },
  job: function() {
    var reservationsByCreatedAt = Reservations.find({}, {sort: { createdAt: 1}});
    console.log(reservationsByCreatedAt.fetch());
    if (reservationsByCreatedAt.count() !== 0) {
      var firstReservation = reservationsByCreatedAt.fetch()[0];

      if (firstReservation.beganProcessingAt === undefined) { // start processing
        console.log("processing first item in queue");
        startProcessing(firstReservation._id);
      } else {
        var timeElapsed = moment.duration(moment() - moment(firstReservation.beganProcessingAt));

        // TODO: change to actual bathroom duration time
        if (timeElapsed > moment.duration(BATHROOM_TIME_SECONDS, 'seconds')) {
          console.log("Removing " + firstReservation._id);
          Reservations.remove(firstReservation._id);

          if (reservationsByCreatedAt.count() > 0) {
            console.log("processing next item in queue");
            startProcessing(reservationsByCreatedAt.fetch()[0]._id);
          }
        }
      }
    }
    else {
      console.log("No reservations to remove!");
    }
  }
});
SyncedCron.start();

function startProcessing(id) {
  console.log("Begin processing " + id);
  Reservations.update(
    { _id: id },
    { $set: { beganProcessingAt: moment().valueOf() } });
}
