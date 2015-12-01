var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var User = require('../models/user');
var config = require('./config');
var fs = require('fs');
var request = require('request');
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
               var User = require('../models/user.js');
            var Chapter = require('../models/chapter.js');
         var mongoose = require('mongoose')
              mongoose.connect('mongodb://jmb316:sf@ds051853.mongolab.com:51853/sf');

module.exports = function(passport) {

    // Needed by passport to serialize and deserialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Auth with google
              console.log("clientID: " + config.auth_env.clientID);
                    console.log("ClientSecret: " + config.auth_env.clientSecret);
                    console.log("URL: " + config.auth_env.callbackURL);
    passport.use(new GoogleStrategy({
        clientID        : config.auth_env.clientID,
        clientSecret    : config.auth_env.clientSecret,
        callbackURL     : config.auth_env.callbackURL
    },
    function(token, refreshToken, profile, done) {
                                    console.log("profile ID: " + profile.id);
                                  
                                    //console.log('ID: ' + profile.id);
                                   // console.log('Display Name: ' + profile.displayName);
                                         var email = profile.emails[0].value;
                                   // console.log('Display email: ' + email);
                                   // console.log('Image URL: ' + profile.image.url);
                                    //console.log('Profile URL: ' + profile.url);
        process.nextTick(function() {
                         console.log("HERE!");
            // try to find the user based on their google id

                     
                         //looking for User in register
                        /* Chapter.findOne({ 'email' : "jennifer.morgan.barry@gmail.com" }, function(err, chapter) {
                                      
                                      if (err)
                                              console.log("chapter doesn't exist");
                                     // return done(err);
                                      if (chapter) {
                                      // user found!
                                      console.log("chapter:");
                                      console.log(chapter);
                                      console.log("Chapter exists");
                                     // return done(null, user);
                                      }
                                         else{
                                              console.log("chapter doesn't exist outside");
                                         return done(null,chapter);
                                         }
                                      })*/
                         

                         
             //looking for User in register
            User.findOne({ 'google_id' : profile.id }, function(err, user) {
            
                         if (err)
                    return done(err);
                                        if (user) {
                    // user found!
                         console.log("user:");
                         console.log(user);
                         console.log("User exists");
                    return done(null, user);
                         }
                         
                             console.log("HERE4!");
                var email = profile.emails[0].value;
                         // if only can have lehigh email address
               // if (email.indexOf("@lehigh.edu", email.length - "@lehigh.edu".length) !== -1) {
                    var newUser = new User();
                         
                         // capture fields
                        // newUser.chapter= "";
                         newUser.google_id = profile.id;
                         newUser.token = token;
                         newUser.name  = profile.displayName;
                         newUser.email = email;
                         var chapid;
                         
                         //getting chapter
                         //db.students.find( { score: { $gt: 0, $lt: 2 } } )
                         //{ 'address' : email }
                         //Chapter.findOne({ "email": { "address": email}}, function(err, chapter) {
                         
                         /*{
                         "email": {
                         "address": email
                         }}
                         */
                         /*{
                         "name.first": "Yukihiro",
                         "name.last": "Matsumoto"
                         }*/
                         console.log("email: "+email);
                         Chapter.findOne({ 'email.address' : email }, function(err, chapter){
                        // , function(err, chapter) {
                                      
                                         if (chapter) {
                                         // user found!
                                         console.log("chapter:");
                                         console.log(chapter);
                                         //console.log("Chapter exists");
                                         //console.log(chapter);
                                         console.log("Chapter Name: "+chapter.chapName);
                                        
                                         chapid=chapter._id;
                                          console.log("Chapter ID: "+chapter._id);
                                         
                                         
                                         newUser.google_id = profile.id;
                                         newUser.token = token;
                                         newUser.name  = profile.displayName;
                                         newUser.email = email;
                                         var chapid;
                                         console.log("Chapter ID2: "+chapid);
                                         newUser.chapter_id= chapid;
                                         
                                         // save the user
                                         newUser.save(function(err) {
                                                      if (err)
                                                      throw err;
                                                      console.log("Saving user");
                                                      return done(null, newUser);
                                                      });
                                  
                                         }
                                         else{
                                         console.log("chapter doesn't exist outside");
                                         console.log("err: "+err);//return err;
                                         }
                                         });
                         
         
                         
                        /* var request = gapi.client.plus.people.get({
                                                                   'userId' : 'me'
                                                                   });
                         
                         request.execute(function(resp) {
                                         console.log('ID: ' + resp.id);
                                         console.log('Display Name: ' + resp.displayName);
                                         console.log('Image URL: ' + resp.image.url);
                                         console.log('Profile URL: ' + resp.url);
                                         });*/
                         
                    //var image_url= "gapi.client.plus.people.get.image/url";
                        var img='https://www.googleapis.com/plus/v1/people/'+profile.id+'?fields=image&key=AIzaSyCnjBi_r7BqHgKIY37bH5bzdzddoXAdYjs';


                    var image_url = "https://www.googleapis.com/plus/v1/people";
                       
                            console.log("url: "+img);  
                         
                    var basepath = __dirname.substring(0, __dirname.lastIndexOf("/"));
                    var filepath = basepath + '/public/images/profile/' + profile.id + '.jpg';
                    download(image_url, filepath, function () {
                        console.log('Saved picture ' + filepath);
                    });
  
                         
               // }
               // else {
               //     return done(null, false, { message: 'Incorrect domain' });
               // }
            });
        });

    }));

};