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

router.get('/', checkAuth, function(req, res) {
           //getting chapter
           //console.log("chapid: "+req.session.user.chapter_id);
           chapter.getFromId(req.session.user.chapter_id, function(chapters) {
                             var db = req.db;
                             var collection = db.get('announcelist');
                             var collectionUser = db.get('users');
                             //getting messages
                             collection.find({'chapter_id': req.session.user.chapter_id},function(err,messages){
                                 if (err)
                                      throw err;
                                    
                                             //getting user
                                    collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                           res.render('index', {name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapname:chapters.chapName,currentUsers:messages,chapid:req.session.user.chapter_id,admin:user.admin,facebook:chapters.facebook});
                                                });
            })
        });
           });

/*end GET home page by chapter */



/* GET chapter events page. */
router.get('/chapterevents',checkAuth, function(req, res) {
           // console.log("chap in profile:"+req.session.user.chapter_id);
           
           var db = req.db;
           var collectionChap = db.get('chapters');
           var collectionUser = db.get('users');
           collectionChap.findOne({'_id': req.session.user.chapter_id},function(e,docs){
                                  //console.log(docs);
                                  //console.log(docs.chapName);
                                  collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                         //console.log(user);
                                                         // console.log("major:"+user.Major);
                                                        // console.log("year:"+docs.facebook);
                                                         console.log("year:"+docs.googleCal);
                                                         
                                                         
                                                         res.render('chapterevents', { name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapid:docs.chapName,id:req.session.user.google_id,year:user.Year,major:user.Major, admin:user.admin,googleCal:docs.googleCal});
                                                         });
                                  });
           });


/* GET chapter signup page. */
router.get('/chaptersignup', function(req, res) {
           res.render('chaptersignup', { title: 'Chapter Signup' });
           });


/* GET Food page. */
router.get('/food', checkAuth,function(req, res) {
                             var db = req.db;
                             var collection = db.get('foodlist');
                             var collectionUser = db.get('users');
                             //getting  food
                             collection.find({'chapter_id': req.session.user.chapter_id},function(err,foods){
                                             if (err)
                                             throw err;
                                             
                                             //getting user
                                             collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                                    res.render('food', {currentUsers:foods,chapid:req.session.user.chapter_id,admin:user.admin});
                                                                    });
                             })

           });

/* GET Login page. */
router.get('/membersignup', function(req, res) {
           res.render('membersignup', { title: 'Member Signup' });
           });

/* GET Login page. */

router.get('/profile',checkAuth, function(req, res) {
          // console.log("chap in profile:"+req.session.user.chapter_id);
           
           var db = req.db;
           var collectionChap = db.get('chapters');
            var collectionUser = db.get('users');
           collectionChap.findOne({'_id': req.session.user.chapter_id},function(e,docs){
                                //console.log(docs);
                               //console.log(docs.chapName);
                                  collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                         //console.log(user);
                                                        // console.log("major:"+user.Major);
                                                        console.log("year:"+docs.facebook);
                                                        console.log("year:"+docs.googleCal);

                                                        
                                                         res.render('profile', { name:req.session.user.name, email:req.session.user.email, google:req.session.user.google_id,chapid:docs.chapName,id:req.session.user.google_id,year:user.Year,major:user.Major, admin:user.admin});
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
           
           var db = req.db;
           var collectionChap = db.get('chapters');
           var collectionUser = db.get('users');
           collectionChap.findOne({'_id': req.session.user.chapter_id},function(e,docs){
                                  console.log(docs);
                                  console.log(docs.chapName);
                                  collectionUser.findOne({'google_id': req.session.user.google_id},function(e,user){
                                                        // console.log(user);
                                                          console.log("major:"+user.name);
                                                         console.log("year:"+user.Year);
                                  
                                                         
                                                         res.render('roster', { rost:docs, chap:docs.chapName,major:user.name});
                                                         });
                                  });
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
           req.logout();//logout of our app, not google in total
           //res.redirect('https://accounts.google.com/logout'); //this logs out of google but won't return to out app
           res.redirect('/login');//common practice
           });

/* GET home page. */
router.get('/login',  function (req, res) {
           // console.log("user login1:"+req.session.user);
           if (req.user) {
           req.session.user = req.user;
           req.session.user.chapter_id=req.user.chapter_id;
           // console.log("user login2:"+req.session.user.chapter_id);
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
               //console.log("GET HOMEPAGE");
               })
               };



router.post('/', checkAuth, function(req, res) {
res.render('index', { title: 'Home' });
            //console.log("post HOMEPAGE");

            
            });




  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
 
// Authentication callback
router.get('/auth/google/callback',
           passport.authenticate('google', {
                                 successRedirect: '/login',
                                 failureRedirect: '/login'
                                 }));



function checkAuth(req, res, next) {
   // console.log("checkAuth in index.js");
    if (req.isAuthenticated())
    {
          //  console.log("AUTH1!");
        //res.locals.user = user;
         // console.log("user:"+req.body.email);
        //console.log("user google id:"+req.session.user.google_id);
        //console.log("user google email:"+req.session.user.email);
        //console.log("chapter id:"+req.session.user.chapter_id);
        //console.log("res: "+res.locals.user);
        //console.log("AUTH2!");
        return next();
    }
    //console.log("NOT AUTH");
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
