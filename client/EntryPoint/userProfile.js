Template.userProfile.helpers({
  Bathrooms: function() {
    return Bathrooms.find({owner: Meteor.userId()});
  }
});
