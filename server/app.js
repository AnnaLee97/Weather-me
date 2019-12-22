var express = require('express');
var app = express();
const request = require('request');
const http = require('http');
var bodyParser = require('body-parser');
const writeLog = require('./src/writeFile').writeLog;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var insertRouter = require('./routes/insert');
var readClassRouter = require('./routes/readClass');
var showResultRouter = require('./routes/showResult');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(8080, function (req, res) {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('listening at http://%s%s', host, port);
});


app.get('/', function(req, res){
  res.render('index.html');
})
app.get('/check',function(req,res){
  res.render('check.html');
});


var url = "http://api.openweathermap.org/data/2.5/weather?q="
var key = "&appid=06c07ab14a274e1f546425b7fd13b2f2";
var obj={};

app.get('/getWeather', function(req, res){
    var city="Seoul";
    if(req.query.city) city = req.query.city;

    var api = url + city +key;
    request(api, function(error, response, body){
      console.log(body);
        var temp = JSON.parse(body);
        
        obj.weather = temp.weather[0].main;
        obj.temperature = parseFloat(temp.main.feels_like)-273.15; //change K to C

        console.log("request: "+city);
        console.log(obj);
        writeLog("w"+obj.weather);
        writeLog("t"+obj.temperature);
        writeLog("y"+city);
    });
    res.send(JSON.stringify(obj));
    res.end();
});


app.use(express.json());
app.use('/push', insertRouter);
app.use('/readClass', readClassRouter);
app.use('/showResult', showResultRouter);


module.exports = app;