//SF
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
/*router.get('/', checkAuth, function(req, res) {
           
           var db = req.db;
           var collection = db.get('chapters');
           collection.findOne({'_id': req.session.user.chapter_id},function(e,docs){
                              console.log(docs);
                              console.log(docs.chapName);
                              
                              res.render('index', { name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapid:docs.chapName});
                              });
});
*/


/* GET home page by chapter. */
var chapter = require('../middleware/chapter');
var messages = require('../middleware/mess');
router.get('/', checkAuth, function(req, res) {
           chapter.getFromId(req.session.user.chapter_id, function(chapters) {
                            console.log(chapters);
             console.log("chapterName"+chapters.chapName);
                              console.log("chaptername"+chapters.chapname);
           var db = req.db;
           var collection = db.get('announcelist');
           /*collection.findOne({},{},function(e,docs){
            console.log(res.json(docs));
            });*/
                             collection.find({'chapter_id': req.session.user.chapter_id},function(err,messages){
                           if (err)
                           throw err;
                           console.log("announcement1");
                           console.log(messages);
                           console.log("announcement2");
                                           
                           res.render('index', {name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapname:chapters.chapName,currentUsers:messages,chapid:chapters._id});
                          // callback(docs);
                           });
           
                          /* collection.getAnnouncements('565b8c822e37fb0300e259ac', function(announce) {
                                                     console.log("chaptes announcements index.js");
                                               console.log(announce);
                                                        res.render('index', {name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapid:chapters.chapName,message:messages.newAnnounce});
                                                     })
                             */
                             })
           });

/*end GET home page by chapter */




/* GET chapter events page. */
router.get('/chapterevents', checkAuth, function(req, res) {
           res.render('chapterevents', { title: 'Chapter Events' });
           });

/* GET chapter signup page. */
router.get('/chaptersignup', function(req, res) {
           res.render('chaptersignup', { title: 'Chapter Signup' });
           });


/* GET Food page. */
/*router.get('/food', checkAuth,function(req, res) {
           res.render('food', { title: 'Food' });
           });*/

router.get('/food', function(req, res) {
           console.log("messages");
           var db = req.db;
           var collection = db.get('foodlist');
           collection.find( { _id: '563d0b06b478a26fc0d712ef' } ),(function(err, messages) {
                                                                                             if (err) {
                                                                 console.log(err);                            throw err;
                                                                                             }
                                                                                             console.log("messages");
                                                                                             console.log(messages);
                                                                                             //callback(messages);
                                                                    })});
          // });



/* GET Login page. */
//router.get('/login', function(req, res) {
 //          res.render('login', { title: 'Login' });
  //         });


/* GET Login page. */
//router.get('/logout', function(req, res) {
//           res.render('logout', { title: 'Logout' });
 //          });

/* GET Login page. */
router.get('/membersignup', function(req, res) {
           res.render('membersignup', { title: 'Member Signup' });
           });

/* GET Login page. */

/*router.get('/profile', checkAuth, function(req, res) {
           console.log("in profile!!");
           var db = req.db;
           var collection = db.get('user');
           collection.findOne({},{},function(e,docs){
                              //console.log(docs.user.name);
                             // console.log(JSON.stringify(res.json(docs)));
                              
                              });
           // res.render('profile', { title: 'Profile' });
           });*/


router.get('/profile',checkAuth, function(req, res) {
           console.log("chap in profile:"+req.session.user.chapter_id);
           
           var db = req.db;
           var collectionChap = db.get('chapters');
            var collectionUser = db.get('users');
           collectionChap.findOne({'_id': req.session.user.chapter_id},function(e,docs){
                                console.log(docs);
                               console.log(docs.chapName);
                                  collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                         console.log(user);
                                                         console.log("major:"+user.Major);
                                                        console.log("year:"+user.Year);


                              
                                                         res.render('profile', { name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapid:docs.chapName,id:req.session.user.google_id,year:user.Year,major:user.Major});
                                                         });
                                   });
           });

//Attempting session for profile

/*router.get('/profile', function(req, res) {
        if (req.session && req.session.user) { // Check if session exists
        // lookup the user in the DB by pulling their email from the session
        users.findOne({ email: req.session.user.email }, function (err, user) {
                     if (!user) {
                     // if the user isn't found in the DB, reset the session info and
                     // redirect the user to the login page
              
                     req.session.reset();
                     res.redirect('/login');
                     } else {
                     // expose the user to the template
                     //res.locals.user = user;
                            console.log("user:"+user);
                     // render the dashboard page
                     res.render('profile');
                     }
                     });
        } else {
        res.redirect('/login');
        }
        });*/




//done profile session

/* GET roster page. */
router.get('/roster', checkAuth,function(req, res) {
           res.render('roster', { title: 'Roster' });
           });

/* GET template page. */
router.get('/template', checkAuth, function(req, res) {
           res.render('template', { title: 'Template' });
           });

/* GET verfiy page. */
router.get('/verfiy', checkAuth, function(req, res) {
           res.render('verify', { title: 'Verify' });
           });


/*NEW ROUTERS*/

// Logout
router.get('/logout', function (req, res) {
           req.logout();
           res.redirect('/login');
           });

/* GET home page. */
router.get('/login',  function (req, res) {
            console.log("user login1:"+req.session.user);
           if (req.user) {
           req.session.user = req.user;
             console.log("user login2:"+req.session.user);
           res.redirect('/');
           }
           else {
           res.render('login');
           }
           });



/* GET home page. */
module.exports = function(passport, app) {
    router.get('/login', checkAuth, function (req, res, next) {
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



router.post('/', checkAuth, function(req, res) {
res.render('index', { title: 'Home' });
            console.log("post HOMEPAGE");

            
            });




  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
 
// Authentication callback
router.get('/auth/google/callback',
           passport.authenticate('google', {
                                 successRedirect: '/login',
                                 failureRedirect: '/login'
                                 }));



function checkAuth(req, res, next) {
    console.log("checkAuth in index.js");
    if (req.isAuthenticated())
    {
          //  console.log("AUTH1!");
        //res.locals.user = user;
         // console.log("user:"+req.body.email);
        console.log("user google id:"+req.session.user.google_id);
        console.log("user google email:"+req.session.user.email);
        console.log("chapter id:"+req.session.user.chapter_id);
        //console.log("res: "+res.locals.user);
        //console.log("AUTH2!");
        return next();
    }
    console.log("NOT AUTH");
    res.redirect('/login');
}


//uploading chap info
var uploads = require('../public/javascripts/upload.js');
// Upload
router.get('/upload', function (req, res) {
           res.render('/', { title: 'Uploading' })
           //upload.doFormDemo(request, response);
           });

router.post('/upload', function (req, res) {
            // Add current user to list of users
            uploads.doFormDemo(req, res);
            //res.redirect('groups/' +  newGroup.id);
            });


module.exports = router;
