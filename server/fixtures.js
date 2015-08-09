  Meteor.startup(function () {
    if (Bathrooms.find().count() === 0) {
      Bathrooms.insert({
        // TODO: Photos for bathrooms
        name: "My awesome toilet",
        description: "poo poo pew pew poo poo",
        price: 2.55,
        owner: 11,
        loc: {
          type : "Point",
          coordinates : [
            -0.12,
            51.50
          ]
        }
      });
      Bathrooms.insert({
        // TODO: Photos for bathrooms
        name: "So far!",
        description: "poo poo pew pew poo poo",
        price: 2.55,
        owner: 11,
        loc: {
          type : "Point",
          coordinates : [
            0,
            0
          ]
        }
      });
    }
    if (Reservations.find().count() === 0) {
      var bathroomId = Bathrooms.findOne({name: "My awesome toilet"})._id;
      Reservations.insert({
        userId: 123,
        bathroomId: bathroomId,
        createdAt: moment().valueOf(),
      });

      Reservations.insert({
        userId: 456,
        bathroomId: bathroomId,
        createdAt: moment().valueOf() + 1000,
      });

      Reservations.insert({
        userId: 789,
        bathroomId: bathroomId,
        createdAt: moment().valueOf() + 2000,
      });
    }
  });
