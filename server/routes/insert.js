var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
const filename = './src/obj.txt';

const eraseLog = require('../src/writeFile').eraseLog;
//const getLog = require('../src/writeFile').getLog;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sjh01210309',
    database: 'weather'
})
connection.connect();

function insert_db(obj) {
    var query = connection.query('insert into tempClass set ?', obj, function(err, rows, cols) {
      //console.log(obj);
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
    //eraseLog();
  });
}


router.get('/', function(req, res){
  
  /*
  obj={};
  var temp = req.query;
  console.log(JSON.stringify(temp));
  obj.weather = temp.weather;
  obj.class = parseInt(temp.class, 10);
  obj.temperature = parseFloat(temp.temperature);
  console.log("GET %j", obj);
  insert_db(obj);
  res.end('OK:' + JSON.stringify(obj));

  */
  var obj={};
  var temp = fs.readFileSync(filename,'utf8');
  var arr = temp.toString().split('\n');
  for(var i=0; i<arr.length ;i++){
      if(arr[i].charAt(0)=='w')
          obj.weather = arr[i].slice(1);
      else if(arr[i].charAt(0)=='t')
          obj.temperature = arr[i].slice(1);
      else if(arr[i].charAt(0)=='c') obj.class = arr[i].slice(1);
      else if(arr[i].charAt(0)=='y') obj.city = arr[i].slice(1);
  }
  var date = new Date();
  obj.year = date.getFullYear();
  obj.month = date.getMonth()+1;
  obj.date = date.getDate();
  
  console.log("GET %j", obj);
  insert_db(obj);
  res.end('OK:' + JSON.stringify(obj));
  
});

module.exports = router;