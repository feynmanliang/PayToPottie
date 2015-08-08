  Meteor.startup(function () {
    if (Bathrooms.find().count() === 0) {
      Bathrooms.insert({
        // TODO: GPS coords for bathroom
        // TODO: Photos for bathrooms
        name: "My awesome toilet",
        description: "poo poo pew pew poo poo",
        price: 2.55,
        owner: 11
      });
    }
    if (Reservations.find().count() === 0) {
      var bathroomId = Bathrooms.findOne()._id;
      Reservations.insert({
        userId: 123,
        bathroomId: bathroomId,
        createdAt: moment().valueOf(),
        status: "Processing"
      });

      Reservations.insert({
        userId: 456,
        bathroomId: bathroomId,
        createdAt: moment().valueOf() + 1000,
        status: "Active"
      });

      Reservations.insert({
        userId: 789,
        bathroomId: bathroomId,
        createdAt: moment().valueOf() + 2000,
        status: "Active"
      });
    }
  });
