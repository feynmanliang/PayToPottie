Template.inUse.helpers({
  endTime: function() {
    console.log(this);
  }
});

Template.inUse.events({
  'click .finished': function() {
    Router.go('bathrooms');
  }
})
