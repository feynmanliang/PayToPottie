Router.route('/bathroom/:_id', function() {
    this.render('bathroom', {
        data: function() {
            return Bathroom.findOne({_id: this.params._id})
        }
    });
});

Router.route('/gateway',{
  template: 'gateway',
  after: function (){
    Session.set('showRegister', false);
   }
});
