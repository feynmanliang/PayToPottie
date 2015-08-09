var timeUntilReady = function(id) {
  var reservations = Reservations.find(
    { bathroomId: id },
    {sort: { createdAt: 1}}
  );
  if (reservations.count() === 0) { return 0; } // empty queue
  else {
    var firstReservation = reservations.fetch()[0];
    var positionInLine = _.map(reservations.fetch(), function(elem) {
      return (elem.userId === Meteor.userId())
    }).indexOf(true);
    positionInLine = positionInLine !== -1 ? positionInLine + 1 : reservations.count();
    if (firstReservation.beganProcessingAt === undefined) {
      // processing has not started
      return moment.duration(BATHROOM_TIME_SECONDS, "seconds") * positionInLine;
    } else {
      // first reservation is processing
      var timeElapsed = moment.duration(moment() - moment(firstReservation.beganProcessingAt));
      return moment.duration(BATHROOM_TIME_SECONDS, "seconds") * positionInLine - timeElapsed;
    }
  }
};

startBathroomCountdown = function(bathroomId) {
  Session.set('countdownStart-' + this._id, undefined);
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
