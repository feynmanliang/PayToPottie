Template.inUse.helpers({
  endTime: function() {
    return (
      moment(
        moment(this.beganProcessingAt)
        + moment.duration(BATHROOM_TIME_SECONDS, 'seconds')
      ).format('hh:mm'));
  }
});

Template.inUse.events({
  'click .finished': function() {
    Router.go('bathrooms');
  }
})
