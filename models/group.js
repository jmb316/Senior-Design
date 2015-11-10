// app/models/user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our group model
var groupSchema = Schema({
        chapter     : String,
        shcool      : String,
        users       : [Schema.Types.ObjectId]
});

// create the model for groups and expose it to our app
module.exports = mongoose.model('Group', groupSchema);
