'use strict';
//Creating a server
const http = require('http');

const express = require("express");
var app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Display the "Home Page"
app.get('/', function(req, res){
    res.sendFile(__dirname + "/display.html");
});

// Receive frontend parameters
app.use(express.urlencoded({extended:true}))
app.post('/yelp-call', (req, res) =>{

// Import the Yelp API Client
const apiKey = 'lK_XNoYU9TEkISrjQC8E2aE-9eamI3uQkYP-xPFHQxwKJ0-Ptd0x64SgN9zAp6kOUWM2ScBc17XQzTeP_vcVc-zs5rXdjUsaK7WxjJ5ZtqPB3y7IBRQFPNIRLBCdXHYx';
const yelp = require('yelp-fusion');

  console.log("Request received.");
  const location = req.body.location
  const cusine = req.body.cusine

  const searchRequest = {
    location: location,
    categories: cusine,
    term: "restaurants",
    open_now: true,
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const r_results = response.jsonBody.businesses;
    // Arrays to store parsed API information
    var restaurant_names = [];
    var restaurant_locations = [];
    var restaurant_distances = [];

    // Parsing the response body
    for (var i = 0; i < r_results.length; i++){
        restaurant_names.push(r_results[i]["name"]);
        restaurant_distances.push(r_results[i]['distance'] + " meters.");
        // Parse the restaurant address for displaying
        var fulladdr = r_results[i]["location"]["display_address"];
        var parsed_addr = "";
        for (var j = 0; j < fulladdr.length; j++){
            parsed_addr += fulladdr[j];
            parsed_addr += " ";
        }
        restaurant_locations.push(parsed_addr);
    }
    //Sends the array to browser
    for (var i = 0; i < r_results.length; i++){
        res.write(restaurant_names[i]);
        res.write("\n");
        res.write(restaurant_locations[i]);
        res.write("\n");
        res.write(restaurant_distances[i]);
        res.write("\n");
    }
    res.end();

  }).catch(e => {
    console.log(e);
  });

});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});