//SF
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});


/* GET chapter events page. */
router.get('/chapterevents', function(req, res) {
           res.render('chapterevents', { title: 'Chapter Events' });
           });

/* GET chapter signup page. */
router.get('/chaptersignup', function(req, res) {
           res.render('chaptersignup', { title: 'Chapter Signup' });
           });

/* GET Food page. */
router.get('/food', function(req, res) {
           res.render('food', { title: 'Food' });
           });


/* GET Login page. */
//router.get('/login', function(req, res) {
 //          res.render('login', { title: 'Login' });
  //         });


/* GET Login page. */
router.get('/logout', function(req, res) {
           res.render('logout', { title: 'Logout' });
           });

/* GET Login page. */
router.get('/membersignup', function(req, res) {
           res.render('membersignup', { title: 'Member Signup' });
           });

/* GET Login page. */
router.get('/profile', function(req, res) {
           res.render('profile', { title: 'Profile' });
           });

/* GET roster page. */
router.get('/roster', function(req, res) {
           res.render('roster', { title: 'Roster' });
           });

/* GET template page. */
router.get('/template', function(req, res) {
           res.render('template', { title: 'Template' });
           });

/* GET verfiy page. */
router.get('/verfiy', function(req, res) {
           res.render('verify', { title: 'Verify' });
           });


/*NEW ROUTERS*/
/* GET home page. */
router.get('/login', function (req, res) {
           if (req.user) {
           res.redirect('/');
           }
           else {
           res.render('login');
           }
           });



/* GET home page. */
module.exports = function(passport, app) {
    router.get('/', checkAuth, function (req, res, next) {
               /*
              user.getAll(req.user.id, function(users) {
                           group.getFromId(req.user.groups, function(groups) {
                                           console.log(groups);
                                           if (groups !== undefined && groups.length > 0) {
                                           req.user.group_obj = groups;
                                           console.log(groups[0]);
                                           res.redirect(groups[0]._id );
                                           } else {
                                           res.render('group' , { user: req.user, users: users , group: '', groups: ''})
                                           }
                                           });
                           }); */
               console.log("GET HOMEPAGE");
               })
               };



router.post('/', function(req, res) {
res.render('index', { title: 'Home' });
            console.log("post HOMEPAGE");

            
            });




  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
 
// Authentication callback
router.get('/auth/google/callback',
           passport.authenticate('google', {
                                 successRedirect: '/',
                                 failureRedirect: '/logout'
                                 }));

/*router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
        res.redirect('/index');
        });*/

function checkAuth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

module.exports = router;
