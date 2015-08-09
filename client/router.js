Router.route('/bathroom/new', function() {
  this.render('bathroomCreate')
});

Router.route('/bathroom/:_id', function() {
  this.render('bathroom', {
    data: function() {
      return Bathrooms.findOne({_id: this.params._id})
    }
  });
});

Router.route('/bathroom', function() {
  this.render('bathrooms');
});

Router.route('/gateway',{
  template: 'gateway',
  after: function (){
    Session.set('showRegister', false);
  }
});
