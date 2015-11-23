var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var app = express();
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://jmb316:sf@ds051853.mongolab.com:51853/sf');


//configure passport
require('./middleware/passport')(passport);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(session({ secret: 'thisisatest', saveUninitialized : true, resave : true } ));
//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
app.use(require('express-session')({
                                   secret: 'keyboard cat',
                                   resave: false,
                                   saveUninitialized: true
                                   }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));





//routes
// Load routes
var routes = require('./routes/index');
//var routes = require('./routes/index');
var users = require('./routes/users');
var foods = require('./routes/foods');
var announce = require('./routes/announce');

// Make our db accessible to our router
app.use(function(req,res,next){
        req.db = db;
        next();
        });

/*app.use(function(req, res, next) {
        console.log("HERE APP.js");
        if (req.session && req.session.user) {
        users.findOne({ email: req.session.user.email }, function(err, user) {
                      console.log("userI: "+req.session.user);
                      if (user) {
                      req.user = user;
                      delete req.user.password; // delete the password from the session
                      req.session.user = user;  //refresh the session value
                      res.locals.user = user;
                      
                      }
                      // finishing processing the middleware and run the route
                      next();
                      });
        } else {
        console.log("user: "+ req.session.user);
        next();
        }
        });*/


/*app.use(function checkAuth(req, res, next) {
    console.log("checkAuth in app.js");
    if (req.isAuthenticated())
    {
        //  console.log("AUTH1!");
        //res.locals.user = user;
        // console.log("user:"+req.body.email);
        console.log("user google id:"+req.session.user.google_id);
        console.log("user google id:"+req.session.user.email);
        //console.log("res: "+res.locals.user);
        //console.log("AUTH2!");
        return next();
    }
    console.log("NOT AUTH");
    res.redirect('/login');
        });*/


//app.use routes
app.use('/',  routes);
app.use('/users', users);
app.use('/foods', foods);
app.use('/announce', announce);




//app.use('/roster',rosters);


//Testing roster
//app.use('/roster', function(req, res) {
       //    res.render('roster', { title: 'Express' });
       //    });


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
