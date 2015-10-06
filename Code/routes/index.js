var express = require('express');
var router = express.Router();

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
router.get('/login', function(req, res) {
           res.render('login', { title: 'Login' });
           });

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

module.exports = router;
