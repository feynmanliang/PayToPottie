Template.registerHelper('countdown', function(bathroomId) {
  var count = Session.get('countdown-' + bathroomId);
  return count ? count : 0;
});

