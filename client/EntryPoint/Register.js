Accounts.ui.config({
   passwordSignupFields:'USERNAME_AND_EMAIL'
});



Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        Meteor.call('createPottyUser',email,password);
        Meteor.loginWithPassword(email, password);
        Router.go('/bathroom');
    }
});
