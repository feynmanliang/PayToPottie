Template.loginButton.events({
  'click .login-button': function(event) {
    event.preventDefault();
    Router.go("/");
  }
});
