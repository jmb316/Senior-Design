var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/announcelist', function(req, res) {
    var db = req.db;
    var collection = db.get('announcelist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET user
 */
router.get('/announce', function(req, res) {
           var db = req.db;
           var collection = db.get('announce');
           collection.find({},{},function(e,docs){
                           res.json(docs);
                           });
           });

router.post('/addannounce', function(req, res) {
    var db = req.db;
    var collection = db.get('announcelist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteannounce/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('announcelist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});








module.exports = router;