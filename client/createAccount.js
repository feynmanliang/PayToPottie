Accounts.ui.config({
   passwordSignupFields:'USERNAME_AND_EMAIL'
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var name = $('[name=name]').val();

        Accounts.createUser({
                   email: email,
                   password: password,
                   profile: {
                    name: name,
                    owner: false
                   }
               });
        //add router event to redirect to e.g. user profile
    }
});
