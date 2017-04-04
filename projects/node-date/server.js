let express = require('express')
let bodyParser = require('body-parser')
let moment = require('moment-timezone');
moment.fn.toJSON = function() { return this.format(); }
let app = express()

//var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json({
  reviver: reviveDates
}))

app.post('/apijs/my-form', (request, response) => {
    response.send(request.body);
})

app.listen(9000)

function reviveDates(key, value){
	var match;
	if (typeof value === "string" && (match = value.match(regexIso8601))) {
	  var milliseconds = Date.parse(match[0]);
	  if (!isNaN(milliseconds)) {
	    return new Date(milliseconds);
	  }
	}
	return value;
}

function reviveMomentDates(key, value){
	var match;
	if (typeof value === "string" && (match = value.match(regexIso8601))) {
	  moment(match[0]).tz('Europe/Paris');
	}
	return value;
}
