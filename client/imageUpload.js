Template.imageUpload.onRendered(function() {
  // This assigns a file drop zone to the "file table"
  // once DOM is ready so jQuery can see it
  BathroomImages.resumable.assignDrop($(".fileDrop"));

  // TODO: This assigns a browse action to a DOM node
  BathroomImages.resumable.assignBrowse($(".fileBrowse"));

  ////////////////////////
  // Setup resumable.js in the UI

  // When a file is added
  BathroomImages.resumable.on('fileAdded', function(file) {

    // Keep track of its progress reactivaly in a session variable
    Session.set(file.uniqueIdentifier, 0);

    // Create a new file in the file collection to upload to
    return BathroomImages.insert({
      _id: file.uniqueIdentifier, // This is the ID resumable will use
      filename: file.fileName,
      contentType: file.file.type
    }, function(err, _id) {
      if (err) {
        console.warn("File creation failed!", err);
        return;
      }
      // Once the file exists on the server, start uploading
      return BathroomImages.resumable.upload();
    });
  });

  // Update the upload progress session variable
  BathroomImages.resumable.on('fileProgress', function(file) {
    return Session.set(file.uniqueIdentifier, Math.floor(100 * file.progress()));
  });

  // Finish the upload progress in the session variable
  BathroomImages.resumable.on('fileSuccess', function(file) {
    return Session.set(file.uniqueIdentifier, void 0);
  });

  // More robust error handling needed!
  return BathroomImages.resumable.on('fileError', function(file) {
    console.warn("Error uploading", file.uniqueIdentifier);
    return Session.set(file.uniqueIdentifier, void 0);
  });
});


// This autorun keeps a cookie up-to-date with the Meteor Auth token
// of the logged-in user. This is needed so that the read/write allow
// rules on the server can verify the userId of each HTTP request.
Tracker.autorun(function() {
  var userId;
  userId = Meteor.userId();
  Meteor.subscribe('bathroomImages', Meteor.userId());
  return $.cookie('X-Auth-Token', Accounts._storedLoginToken());
});

////////////////////////
// UI template helpers
var shorten = function(name, w) {
  if (w == null) {
    w = 16;
  }
  w += w % 4;
  w = (w - 4) / 2;
  if (name.length > 2 * w) {
    return name.slice(0, +w + 1 || 9e9) + '…' + name.slice(-w - 1);
  } else {
    return name;
  }
};


Template.imageUpload.events({
  // Wire up the event to remove a file by clicking the `X`
  'click .del-file': function(e, t) {
    return BathroomImages.remove({
      _id: this._id
    });
  }
});

Template.imageUpload.helpers({
  dataEntries: function() {
    // Reactively populate the table
    return BathroomImages.find({});
  },
  shortFilename: function(w) {
    var ref;
    if (w == null) {
      w = 16;
    }
    if ((ref = this.filename) != null ? ref.length : void 0) {
      return shorten(this.filename, w);
    } else {
      return "(no filename)";
    }
  },
  owner: function() {
    var ref, ref1;
    return (ref = this.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0;
  },
  id: function() {
    return "" + this._id;
  },
  link: function() {
    return BathroomImages.baseURL + "/" + this.md5;
  },
  uploadStatus: function() {
    var percent;
    percent = Session.get("" + this._id);
    if (percent == null) {
      return "Processing...";
    } else {
      return "Uploading...";
    }
  },
  formattedLength: function() {
    return numeral(this.length).format('0.0b');
  },
  uploadProgress: function() {
    var percent;
    return percent = Session.get("" + this._id);
  },
  isImage: function() {
    var types;
    types = {
      'image/jpeg': true,
      'image/png': true,
      'image/gif': true,
      'image/tiff': true
    };
    return types[this.contentType] != null;
  },
  loginToken: function() {
    Meteor.userId();
    return Accounts._storedLoginToken();
  },
  userId: function() {
    return Meteor.userId();
  }
});
