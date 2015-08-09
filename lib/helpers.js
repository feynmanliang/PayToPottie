timeUntilReady = function(id) {
  var reservations = Reservations.find(
    { bathroomId: id },
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
};

startBathroomCountdown = function(bathroomId) {
  var countdown = function() {
    var timeLeft = timeUntilReady(bathroomId);
    if (timeLeft > 0) {
      Session.set("countdown-" + bathroomId, timeLeft);
    } else {
      Session.set("countdown-" + bathroomId, undefined);
      return Meteor.clearInterval(interval);
    }
  };
  var interval = Meteor.setInterval(countdown, COUNTDOWN_TIME_MILLIS);
}
