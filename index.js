var express = require('express');
var app = express();
var happycalculator = require('happycalculator');
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/calculus', function (req, res) {
	var queryData = url.parse(req.url, true).query;

	if(!queryData.query){
		res.send(JSON.stringify({ error: true, message: "Query parameter missing" }));
	}

	var b64string = queryData.query;
	var query = new Buffer(b64string, 'base64') + "";
	query = query.replace(/\s+/g, '');
	
	if(validateCode(query)){
		try {
			var output = happycalculator.calculate(query);
			res.send(JSON.stringify({ error: false, message: output }));
		}
		catch(err) {
			res.send(JSON.stringify({ error: true, message: "Syntax error" }));
		}
	}else{
		res.send(JSON.stringify({ error: true, message: "Invalid format" }));
	}
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function validateCode(query){
    if( /[^0-9\+\-\/\(\)\*\.\,]/.test( query ) ) {
       return false;
    }
    return true;     
 }