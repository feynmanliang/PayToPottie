Meteor.startup(function() {
  // Allow rules for security. Should look familiar!
  // Without these, no file writes would be allowed
  BathroomImages.allow({
    // The creator of a file owns it. UserId may be null.
    insert: function (userId, file) {
      // Assign the proper owner when a file is created
      file.metadata = file.metadata || {};
      file.metadata.owner = userId;
      return true;
    },
    // Only owners can remove a file
    remove: function (userId, file) {
      // Only owners can delete
      return (userId === file.metadata.owner);
    },
    // Anyone can retrieve a file via HTTP GET
    read: function (userId, file) {
      //return (userId === file.metadata.owner);
      return true;
    },
    // This rule secures the HTTP REST interfaces' PUT/POST
    // Necessary to support Resumable.js
    write: function (userId, file, fields) {
      // Only owners can upload file data
      return (userId === file.metadata.owner);
    }
  });
});
