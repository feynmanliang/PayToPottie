Template.joinQueue.events({
  "click .joinQueue": function(event) {
    event.preventDefault();

    var queue = Reservations.findOne({bathroomId: this._id, userId: Meteor.userId()});

    // if reservation exists, remove it
    // otherwise insert new queue
    if(queue) {
      Reservations.remove(queue._id);

      // Redirect to all bathroom page
      Router.go('bathrooms');
    } else {
      var result = Reservations.insert({
        userId: Meteor.userId(),
        createdAt: moment().valueOf(),
        bathroomId: this._id,
        status: "Active"
      });
      startBathroomCountdown(this._id);

      // Redirect to bathroom waiting page
      Router.go('bathroom', {_id: this._id});
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
      return 'Reserve';
    }
  }
})
