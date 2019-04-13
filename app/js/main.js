
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


    $('.validate-form').on('submit',function(){
        check=false;
        
        getInput();

        return check;
    });


function getInput(){

    var location = $('input[name="location"]');
    var cuisine = $('input[name="cuisine"]');
    var params = [location, cuisine];

    $.ajax({
        url:"/app/yelp_fusion_client/yelp_api.js",
        method:"POST",
        data:{params: params},

        success: function(msg){
            console.log( "Data Saved: " + msg );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("some error");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    //need a way to send params to back end

    return false;
}




