  Meteor.startup(function () {
    if (Reservations.find().count() === 0) {
      Reservations.insert({
        userId: 123,
        createdAt: moment().valueOf(),
        status: "Processing"
      });

      Reservations.insert({
        userId: 456,
        createdAt: moment().valueOf() + 1000,
        status: "Active"
      });

      Reservations.insert({
        userId: 789,
        createdAt: moment().valueOf() + 2000,
        status: "Active"
      });
    }
  });
