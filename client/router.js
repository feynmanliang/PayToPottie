Router.route('/bathroom/:_id', function() {
  this.render('bathroom', {
    data: function() {
      return Bathrooms.findOne({_id: this.params._id})
    }
  });
});
