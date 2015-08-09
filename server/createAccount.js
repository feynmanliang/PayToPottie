Meteor.methods({
  'createPottyUser': function(email, password){
    Accounts.createUser({
                 email: email,
                 password: password,
                 profile: {
                  owner: false,
                  reservations: []
                 }
             });
  }
});
