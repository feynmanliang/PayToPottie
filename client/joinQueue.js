Template.joinQueue.events({
    "click": function(event) {
        console.log(this);
        console.log(Template.parentData(1));
        event.preventDefault();
        Reservations.insert({
          userId: Math.floor(Math.random() * 1000) + 1,
          createdAt: moment().valueOf(),
          bathroomId: this._id,
          status: "Active"
        });
    }
});
