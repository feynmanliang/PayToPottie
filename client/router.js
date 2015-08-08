Router.route('/bathroom/:_id', function() {
    this.render('bathroom', {
        data: function() {
            return Bathroom.findOne({_id: this.params._id})
        }
    });
});
