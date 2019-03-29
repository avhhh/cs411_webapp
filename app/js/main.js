
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input2').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
            
  
    
    /*==================================================================
    [ Validate ]*/
    /*var zipcode = $('.validate-input input[name="zipcode"]');
    var cuisine = $('.validate-input input[name="cuisine"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input2').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }*/
    

})(jQuery);



function getInput(){

    var location = $('input[name="location"]');
    var cuisine = $('input[name="cuisine"]');
    var params = [location, cuisine];

    doAPI(params);


    return false;
}


function doAPI(params){
    'use strict';
// <<<<<<< HEAD
// var express = require('express'),
//     app = express(),

    // require other modules


// require and load dotenv
// require('dotenv').load();
// =======
// >>>>>>> parent of 9ea6ef8... lol

// Import the Yelp API Client
const yelp = require('../yelp_fusion_client/node_modules_yelp-fusion');
const apiKey = 'lK_XNoYU9TEkISrjQC8E2aE-9eamI3uQkYP-xPFHQxwKJ0-Ptd0x64SgN9zAp6kOUWM2ScBc17XQzTeP_vcVc-zs5rXdjUsaK7WxjJ5ZtqPB3y7IBRQFPNIRLBCdXHYx';

// Sets parameters for restaurant search


const searchRequest = {
  categories: params[0],
  location: params[1],
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


}








