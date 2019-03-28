'use strict';

// Import the Yelp API Client
const yelp = require('yelp-fusion');
const apiKey = 'lK_XNoYU9TEkISrjQC8E2aE-9eamI3uQkYP-xPFHQxwKJ0-Ptd0x64SgN9zAp6kOUWM2ScBc17XQzTeP_vcVc-zs5rXdjUsaK7WxjJ5ZtqPB3y7IBRQFPNIRLBCdXHYx';

const searchRequest = {
  categories: 'drinks',
  location: 'boston, ma',
  open_now: true
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const r_results = response.jsonBody.businesses;

  // Iterates through the JSON body and prints result to console
  var i;
  for (i = 0; i < r_results.length; i++){
    const JSON_string = JSON.stringify(r_results[0], null, 4);
    console.log(JSON_string);
  }
}).catch(e => {
  console.log(e);
});