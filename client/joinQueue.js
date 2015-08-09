Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();

    var canJoin = true;
    var currId = Meteor.userId();

    var currQ = Reservations.find({bathroomId: this._id});
    var currBathroom = Bathrooms.findOne({_id: this._id});

    currQ.forEach(function(customer) {
      if (customer.userId === currId) {
        canJoin = false;
      }
    });


    var newReservation = {
      userId: currId,
      createdAt: moment().valueOf(),
      bathroomId: this._id,
      status: "Active"
    };
    if (canJoin && currBathroom.active) {
      Reservations.insert(newReservation);

      startBathroomCountdown(this._id);
    }
   }
});
