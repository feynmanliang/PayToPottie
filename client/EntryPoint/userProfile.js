Template.userProfile.helpers({
  Bathrooms: function() {
    var id = Meteor.userId();
    var baths = Bathrooms.find({owner: id});
    if (baths) {
      return Bathrooms.find({owner: id});
    } else {
      return 0;
    }
  }
});
