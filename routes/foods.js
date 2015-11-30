var express = require('express');
var router = express.Router();

/*Start of Food Request*/
/*
 * GET userlist.
 */
router.get('/foodlist', function(req, res) {
          // alert("getting userlist");
    var db = req.db;
    var collection = db.get('foodlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});



/*
 * GET  food per chapter
 */
router.get('/food', function(req, res) {
            console.log("messages");
           var db = req.db;
           var collection = db.get('food');
           collection.find({"foodID": "1"}).limit(limit).skip(offset).exec(function(err, messages) {
                                                                                            if (err) {
                                                                                            throw err;
                                                                                            }
                                                                                             console.log("messages");
                                                                                             console.log(messages);
                                                                                            callback(messages);
                                                                                            });
           });
           //});
/*Message.find({group: groupId}).sort({'_id': -1}).limit(limit).skip(offset).exec(function(err, messages) {
                                                                                if (err) {
                                                                                throw err;
                                                                                }
                                                                                callback(messages);
                                                                                });*/


/*
 * GET All food
 */
/*router.get('/food', function(req, res) {
           var db = req.db;
           var collection = db.get('food');
           collection.find({},{},function(e,docs){
                           res.json(docs);
                           });
           });*/

router.post('/addfood', function(req, res) {
    var db = req.db;
    var collection = db.get('foodlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletefood/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('foodlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
/*End of food request*/









module.exports = router;