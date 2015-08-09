Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();
    Reservations.insert({
      userId: Math.floor(Math.random() * 1000) + 1,
      createdAt: moment().valueOf(),
      bathroomId: this._id,
      status: "Active"
    });
  }
});
