var Group = require('../models/chapter');
var user = require('../middleware/user');
var Message = require('../models/message');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /*getFromId: function (ids, callback) {
        //make array if not already
        if (!(ids instanceof Array)) {
            ids = [ids];
        }
        Group.find({'_id': { $in: ids }}, function (err, groups) {
            if (err)
                throw err;
            callback(groups);
        });*/
        
        
        
    getFromId: function (ids, callback) {
        //make array if not already
        Group.findOne({'_id': ids},function(err,docs){
                   if (err)
                   throw err;
                   callback(docs);
                   });
    },
    getAnnouncements: function (ids, callback) {
    //make array if not already
        console.log("ids:"+ids);

        /*collection.findOne({},{},function(e,docs){
                           console.log(res.json(docs));
                           });*/
    Message.find({'_id': ids},function(err,docs){
                  if (err)
                  throw err;
              console.log("announcement1");
              console.log(docs);
              console.log("announcement2");
                  callback(docs);
                  });
    },

    addGroup: function (user_ids, name, desc) {
        //make array if not already
        if (!(user_ids instanceof Array)) {
            user_ids = [user_ids];
        }

        //Turn into array of object Id
        user_ids = user_ids.map(function (id) {
            return ObjectId(id);
        });

        var newGroup = new Group();
        newGroup.name = name;
        newGroup.users = user_ids;
        newGroup.description = desc;

        newGroup.save(function (err, saved) {
            if (err)
                throw err;
        });
        var index;
        user.addAllGroup(user_ids, newGroup.id, function (user) {
//            console.log(user);
        });
        return newGroup;
    },
    find: function (id, callback) {
        Group.findById(ObjectId(id), function (err, group) {
                       console.log("in find chapter.js middleware");
            if (err)
                throw err;
            callback(group);
        });
    }, // Deprecated
    addUser: function (group_id, user_ids, callback) {
        Group.findByIdAndUpdate(group_id, { $addToSet: { users: { $each: user_ids } }}, function (err, group) {
            if (err)
                throw err;
            callback(group);
        })
    },
    addMessage: function(group_id, message_ids, callback) {
        Group.findByIdAndUpdate(group_id, {$addToSet: {messages: {$each: message_ids} }}, function(err, group) {
            if (err) {
                throw err;
            }
            callback(group);
        })
    }

};
