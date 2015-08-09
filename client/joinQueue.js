Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();


    var currId = Meteor.userId();
    var currQ = Reservations.find({bathroomId: this._id});
    var canJoin = true;

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
    if (canJoin) {
      Reservations.insert(newReservation);
    }
   }
});
