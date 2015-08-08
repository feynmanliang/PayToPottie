// Cron job to update queue
SyncedCron.add({
  name: 'Updates Reservations queues',
  schedule: function(parser) {
    return parser.text('every 5 seconds');
  },
  job: function() {
    Reservations.remove(Reservations.findOne()._id);
  }
});
SyncedCron.start();

