Template.bathroom.onRendered(function() {
  if (typeof(this.data) !== "undefined") {
    startBathroomCountdown(this.data._id);
  }
});

