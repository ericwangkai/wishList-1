
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    passport = require('passport'),
    api = require('./routes/api');

var app = module.exports = express();

var DB = require('./accessDB');
var conn = 'mongodb://localhost/test';
var db;
// Configuration


app.configure(function(){
  app.set('views', __dirname + '/views');
    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('view options', {
        layout: false
    });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'omgnodeworks' }));
  app.use(app.router);
  /*
  app.use(express.session({
    store: mongoStore(conn)
  , secret: 'applecake'
  }, function() {
    app.use(app.router);
  }));
  */
  app.use(passport.initialize());
  //app.use(passport.session());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

db = new DB.startup(conn);

/*
passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log("Authentication -> Email : " + email + " , password : " + password);
    db.verifyCredential(email, password, done);
  }
));
*/
// Routes
app.get('/', routes.index);
app.post('/login', passport.authenticate('local', {successFlash: 'Welcome!'}));

/*
app.post('/login', function(req, res, next) {
	console.log("Authentication -> Email : " + req.body.email + " , password : " + req.body.password);
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  })(req, res, next);
});
*/
app.post('/register', api.register);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);

app.post('/api/addPost', api.addPost);
app.post('/api/editPost', api.editPost);
app.post('/api/deletePost', api.deletePost);

appServer = app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", appServer.address().port, app.settings.env);
});
