// app/models/user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our group model
var messageSchema = Schema({
        newAnnounce : String,
        timeStamp : String,
        chapter_id : String

});


// create the model for groups and expose it to our app
module.exports = mongoose.model('announcelist', messageSchema);