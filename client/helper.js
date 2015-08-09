Template.registerHelper('countdown', function(bathroomId) {
  var count = Session.get('countdown-' + bathroomId);
  return moment.utc(count ? count : 0).format("mm:ss");
});

