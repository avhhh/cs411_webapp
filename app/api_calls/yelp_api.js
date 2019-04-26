'use strict';
//Creating a server
const http = require('http');
const mysql = require('mysql');

const express = require("express");
var app = express();
const hostname = "127.0.0.1";
const port = 3000;


var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

app.get('/', function(req, res){
    res.sendFile(__dirname + "/fb_main.html");
});

app.get('/main_page', function(req, res){
  res.sendFile('/Users/Owner/Desktop/cs411_proj/friendsconnect_webapp/app/index.html');
})
var fb_accessToken = "";
passport.use(new FacebookStrategy({
    clientID: "292796878300593",
    clientSecret: "3f7d6dd64dd13bb9c8bac671914957b6",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {   
      // Just logs your Facebook Account name to the terminal
      console.log("Login successfully as:");
      console.log(profile.displayName);
      console.log("Your AccessToken is:", accessToken);
      done();
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
  passport.authenticate('facebook', {
    successRedirect: '/', 
    failureRedirect: '/main_page'
   }));

// Receive frontend parameters
app.use(express.urlencoded({extended:true}));


app.post('/yelp-call', (req, res) =>{

// Import the Yelp API Client
const apiKey = 'lK_XNoYU9TEkISrjQC8E2aE-9eamI3uQkYP-xPFHQxwKJ0-Ptd0x64SgN9zAp6kOUWM2ScBc17XQzTeP_vcVc-zs5rXdjUsaK7WxjJ5ZtqPB3y7IBRQFPNIRLBCdXHYx';
const yelp = require('yelp-fusion');

  const params = req.body.params;
  console.log("Request received.");
  const location = params[0];
  //const cuisine = params[1];
  const price = params[1];
  const distance = params[2];
  // params[3] is starting time

  const searchRequest = {
    location: location,
   // categories: cuisine,
    term: "restaurants",
    //radius: distance,
    price: price,
    sort_by: "rating",
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const r_results = response.jsonBody.businesses;
    // Arrays to store parsed API information
    var restaurant_names = [];
    var restaurant_locations = [];
    var restaurant_distances = [];
    var restaurant_prices = [];

    // Parsing the response body
    for (var i = 0; i < r_results.length; i++){
        restaurant_names.push(r_results[i]["name"]);
        restaurant_distances.push(r_results[i]['distance'] + " meters.");
        // Parse the restaurant address for displaying
        var fulladdr = r_results[i]["location"]["display_address"];
        var parsed_addr = "";
        restaurant_prices.push(r_results[i]["price"]);
        for (var j = 0; j < fulladdr.length; j++){
            parsed_addr += fulladdr[j];
            parsed_addr += " ";
        }
        restaurant_locations.push(parsed_addr);
    }
    var output = [restaurant_names, restaurant_locations, restaurant_distances, restaurant_prices];
 
    res.send(output);
    res.end();

  }).catch(e => {
    console.log(e);
  });

});


app.post('/db-call', (req, res)=>{
  const location = req.body.location;
  const time = req.body.time;
  //get personal info

  const connection = mysql.createConnection({
    host: hostname,
    user: 'root',
    password: '',
    database: 'main'
  });

  connection.connect();

  const query = "INSERT INTO `main`(`user`, `time`, `location`) VALUES ('user', 'time', 'locaiton')";

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  connection.end();

});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});