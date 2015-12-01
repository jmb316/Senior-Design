// app/models/user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var chapterSchema = Schema({
        
        chapName     : String,
        email        : String,
        google_id    : String,
        token        : String,
        chapter      : String,
        facebook      : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Chapter', chapterSchema);
