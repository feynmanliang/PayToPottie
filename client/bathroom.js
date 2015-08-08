Template.bathroom.helpers({
  timeUntilReady: function() {
    var reservations = Reservations.find(
      { bathroomId: this._id },
      {sort: { createdAt: 1}}
    );
    if (reservations.count() === 0) { return 0; } // empty queue
    else {
      var firstReservation = reservations.fetch()[0];
      if (firstReservation.beganProcessingAt === undefined) {
        // processing has not started
        return moment.duration(BATHROOM_TIME_SECONDS, "seconds") * reservations.count();
      } else {
        // first reservation is processing
        var timeElapsed = moment.duration(moment() - moment(firstReservation.beganProcessingAt));
        return moment.duration(BATHROOM_TIME_SECONDS, "seconds") * reservations.count() - timeElapsed;
      }
    }
  }
});
