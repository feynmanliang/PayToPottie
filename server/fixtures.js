  Meteor.startup(function () {
    if (Bathrooms.find().count() === 0) {
      // TODO: Pictures for bathrooms
      var bathroomId1 = Bathrooms.insert({
        name: "My awesome toilet",
        description: "poo poo pew pew poo poo",
        price: 2.55,
        owner: 11,
        loc: {
          type : "Point",
          coordinates : [
            -122.4194160,
            37.7749290
          ]
        },
        active: true
      });
      var bathroomId2 = Bathrooms.insert({
        name: "My dirty toilet",
        description: "explosive diarrhea",
        price: 0.50,
        owner: 12,
        loc: {
          type : "Point",
          coordinates : [
            -122.415,
            37.7751
          ]
        },
        active: true
      });
      var bathroomId3 = Bathrooms.insert({
        name: "My inactive toilet",
        description: "consipated",
        price: 0.50,
        owner: 12,
        loc: {
          type : "Point",
          coordinates : [
            -122.422,
            37.7751
          ]
        },
        active: false
      });
      var bathroomId4 = Bathrooms.insert({
        name: "Super far bathroom",
        description: "consipated",
        price: 0.50,
        owner: 12,
        loc: {
          type : "Point",
          coordinates : [
            0.1,
            0.1
          ]
        },
        active: false
      });
      var bathroomId5 = Bathrooms.insert({
        name: "Parisoma",
        description: "Meteor Hackathon",
        price: 999,
        owner: 2304234,
        address: "169 11th Street, San Francisco, CA 94103",
        loc: {
          type : "Point",
          coordinates : [
            -122.415880,
            37.773624
          ]
        },
        active: true
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
    Reservations.insert({
      userId: Math.floor(Math.random() * 1000 + 1),
      bathroomId: bathroomId3,
      createdAt: moment().valueOf()
    })
  });
