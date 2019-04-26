
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
            

})(jQuery);


    $('.validate-form').on('submit',function(){
        check = false;
        
        getInput();

        return check;
    });


function getInput(){

    var location = $('input[name="location"]').val();
    // var cuisine = $('input[name="cuisine"]').val();
    var price = parsePrice();
    var distance = parseDistance();
    var params = [location, price, distance]; // add cuisine

    $.ajax({
        url:"http://127.0.0.1:3000/yelp-call",
        method:"POST",
        data:{params: params},

        success: function(output){
            showResults(output);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("some error");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    return false;
}


function parsePrice(){
    var ret = "";
    var price = parseInt($("select[name='price'] option:selected").val());
    if(price > 0){
        for(var i = 0; i < price; i++){
            ret += (i+1).toString();
            if(i < price -1) ret += ", ";
        }
    }
    return ret;
}

function parseDistance(){
    var distance = parseInt($("select[name='walkDistance'] option:selected").val());
    return distance;
}





function showResults(output){
    //change title
    $("#title").fadeOut(function(){
            $("#title").html("Results are here! select a restaurant").fadeIn();
    });

    var htmlString = "";

    for(var i=0; i<output[0].length; i++){
        htmlString += "<tr>";
        htmlString += "<td>" + output[0][i] + "</td>";
        htmlString += "<td>" + output[1][i] + "</td>";
        htmlString += "<td>" + output[2][i] + "</td>";
        htmlString += "<td>" + output[3][i] + "</td>";
        htmlString += "</tr>";
    }

    $("#resultsTable").append(htmlString);

    $("#content1").fadeOut(function(){
        $("#content2").fadeIn();
    });
}





function writeEvent(){

    var time = $('input[name="time"]').val();
    var location = $();
    //include user
    var params = [location, time/*, user*/];

    $.ajax({
        url:"http://127.0.0.1:3000/db-call",
        method:"POST",
        data:{params: params},

        success: function(output){
            console.log(output);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("some error");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}


