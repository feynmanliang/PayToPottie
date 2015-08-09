Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();

    var queue = Reservations.findOne({bathroomId: this._id, userId: Meteor.userId()});

    // if queue exists, remove it
    // otherwise insert new queue
    console.log("queue", queue);
    if(queue) {
      Reservations.remove(queue._id);
    } else {
      var result = Reservations.insert({
        userId: Meteor.userId(),
        createdAt: moment().valueOf(),
        bathroomId: this._id,
        status: "Active"
      });
      console.log("reservation id:", result);
      startBathroomCountdown(this._id);
    }
  }
});

Template.joinQueue.helpers({
  class: function() {
    if(Reservations.findOne({bathroomId: this._id, userId: Meteor.userId()})) {
      // has reservation
      return "btn-danger leave-queue";
    } else {
      return 'btn-success';
    }
  },
  text: function() {
    if(Reservations.findOne({bathroomId: this._id, userId: Meteor.userId()})) {
      // has reservation
      return 'Cancel';
    } else {
      return 'Go';
    }
  }
})
