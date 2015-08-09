Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();

    var currId = Meteor.userId();
    var newReservation = {
      userId: currId,
      createdAt: moment().valueOf(),
      bathroomId: this._id,
      status: "Active"
    };

    Reservations.insert(newReservation);
   }
});
