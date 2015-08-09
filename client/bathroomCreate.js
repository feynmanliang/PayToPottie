Template.bathroomCreate.events({
  'submit .newBathroom': function(event) {
    event.preventDefault();
    window.something = event.target;
    console.log(event.target);
    // TODO: change to current user's id
    var owner = Meteor.userId() || undefined;
    var bathroomId = Bathrooms.insert({
      // TODO: GPS coords for bathroom
      // TODO: Photos for bathrooms
      name: event.target.name.value,
      description: event.target.description.value,
      price: parseInt(event.target.price.value),
      owner: owner
    });
    Router.go('/bathroom/' + bathroomId);
  }
})
