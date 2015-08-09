  Meteor.startup(function () {
    if (Bathrooms.find().count() === 0) {
      var bathroomId1 = Bathrooms.insert({
        // TODO: GPS coords for bathroom
        // TODO: Photos for bathrooms
        name: "My awesome toilet",
        description: "poo poo pew pew poo poo",
        price: 2.55,
        owner: 11
      });
      var bathroomId2 = Bathrooms.insert({
        // TODO: GPS coords for bathroom
        // TODO: Photos for bathrooms
        name: "My dirty toilet",
        description: "explosive diarrhea",
        price: 0.50,
        owner: 12
      });
    }
    if (Reservations.find().count() === 0) {
      Reservations.insert({
        userId: 123,
        bathroomId: bathroomId1,
        createdAt: moment().valueOf(),
      });

      Reservations.insert({
        userId: 456,
        bathroomId: bathroomId1,
        createdAt: moment().valueOf() + 1000,
      });

      Reservations.insert({
        userId: 789,
        bathroomId: bathroomId1,
        createdAt: moment().valueOf() + 2000,
      });
    }
    for(var i = 0; i < 100; i++) {
      Reservations.insert({
        userId: Math.floor(Math.random() * 1000 + 1),
        bathroomId: bathroomId2,
        createdAt: moment().valueOf() + 1000 * i
      })
    }
  });
