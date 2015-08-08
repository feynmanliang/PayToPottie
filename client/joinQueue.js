Template.joinQueue.events({
    "click": function(event) {
        event.preventDefault();
        Reservations.insert({
          userId: Math.floor(Math.random() * 1000) + 1,
          createdAt: moment().valueOf(),
          status: "Active"
        });
    }
});
