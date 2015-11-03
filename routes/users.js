var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

//gettign profile info

router.get('/profile', function(req, res) {
           console.log()
           var db = req.db;
           var collection = db.get('user');
           collection.findOne({},{},function(e,docs){
                             console.log(res.json(docs));
                           });
           });


/*
 * GET user
 */
router.get('/user', function(req, res) {
           var db = req.db;
           var collection = db.get('user');
           collection.find({},{},function(e,docs){
                           res.json(docs);
                           });
           });


/*
 * GET chapters
 */
router.get('/chapterlist', function(req, res) {
           var db = req.db;
           var collection = db.get('chapterlist');
           collection.find({},{},function(e,docs){
                           res.json(docs);
                           });
           });


/*
 * POST to chapters.
 */
router.post('/addchapter', function(req, res) {
            var db = req.db;
            var collection = db.get('chapterlist');
                                          /* collection.insert(req.body, function(err, result){
                                                 res.send(
                                                          (err === null) ? { msg: '' } : { msg: err }
                                                          );
                                                 });*/

collection.update(
                 { School: "Lehigh", Chapter: "AXO" },   {      School: "Lehigh", Chapter: "AXO"  ,    Facebook: "1:35"   },   { upsert: true }
                  );
            
                       });
/*
            
            
            
            
            var db = req.db;
            var collection = db.get('chapterlist');
            
             var query      = {"Lehigh":"Lehigh"};
            
            collection.findOne(query, function(err, school){
                         if (school) {
                         err = 'The chapter you entered already exists';
                         callback(err);
                         } else {
                              // err = 'Trying to create';
                              // callback(err);
                         // create the new user
                        // coll.insert(newChapter, function(err,user){
                                   //  callback(err,user);
                                   //  });
                               collection.insert(req.body, function(err, result){
                                                 res.send(
                                                          (err === null) ? { msg: '' } : { msg: err }
                                                          );
                                                 });

                         }
                         });
            
            });
*/

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;