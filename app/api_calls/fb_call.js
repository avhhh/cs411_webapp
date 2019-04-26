const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const port = 3000

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

app.get('/', function(req, res){
    res.sendFile(__dirname + "/fb_main.html");
});

passport.use(new FacebookStrategy({
    clientID: "292796878300593",
    clientSecret: "3f7d6dd64dd13bb9c8bac671914957b6",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Just logs your Facebook Account name to the terminal
    console.log("Login successfully.");
    console.log(profile.displayName);
  }
));

/* 
Redirect the user to Facebook for authentication.  When complete,
Facebook will redirect the user back to the application at     
/auth/facebook/callback
*/
app.get('/auth/facebook', passport.authenticate('facebook'));
/*
Facebook will redirect the user to this URL after approval.  Finish the
authentication process by attempting to obtain an access token.  If
access was granted, the user will be logged in.  Otherwise,
authentication has failed.
*/
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login', scope: 'read_stream' }));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});