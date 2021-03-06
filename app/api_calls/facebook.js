var https = require('https');

exports.getFbData(accessToken, apiPath, callback){
    var options = {
        host: 'graph.facebook.com',
        port: 300,
        path: '/me/friends?access_token=' + accessToken,
        method: 'GET'
    };

    // Concatenates the request results into string
    var buffer = ""
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });

        request.on('error', function(e){
            console.log('error from facebook.getFbData: ' + e.message)
        });

        request.end();
    });