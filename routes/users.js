var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
           // alert("getting userlist");
           var db = req.db;
           var collection = db.get('userlist');
           collection.find({},{},function(e,docs){
                           res.json(docs);
                           });
           });

//gettign profile info

router.get('/profile', function(req, res) {
           console.log("in profile!!");
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

/*collection.insert({'school':req.body.School}, {'Chapter':req.body.Chapter}, function(err, doc){
 // no error, inserted new document, with _id=1
 collection.insert({_id:1}, {w:1}, function(err, doc){
 // error occured since _id=1 already existed
 });
 });*/

router.post('/addchapter', function(req, res) {
            var db = req.db;
            var collection = db.get('chapterlist');


            //req.session.user.chapter=req.id;
            collection.insert(req.body, function(err, result){
                               //console.log("result");
                               console.log("result id:"+result._id);
                                console.log("chap id:"+req.session.user.chapter_id);
                              req.session.user.chapter_id=result._id;
                              res.send(
                                       (err === null) ? {mes:result} : { msg: err }
                                       );
                              });
            /* collection.insert({'School':req.body.School}, function(err, result){
             // no error, inserted new document, with _id=1
             collection.insert({'School':req.body.School}, function(err, result){
             // error occured since _id=1 already existed
             });
             });*/
            
/*collection.update(
 { School: "Lehigh", Chapter: "AXO" },   {     Facebook: "1:35"   },   { upsert: true }
 );*/
            
            // });
            
            
            
            /*
             
             // var db = req.db;
             // var collection = db.get('chapterlist');
             
             var query      = {"School":req.body.School};
             
             collection.findOne(query, function(err, school){
             if (query) {
             console.log("query"+query.Chapter);
             console.log('The chapter you entered already exists');
             
             return;
             } else {
             
             collection.insert(req.body, function(err, result){
             res.send(
             (err === null) ? { msg: '' } : { msg: err }
             );
             });
             
             }
             });*/
            
            });


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