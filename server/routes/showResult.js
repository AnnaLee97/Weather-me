var express = require('express');
var router = express.Router();
var fs = require('fs');
const filename = './src/obj.txt';

const eraseLog = require('../src/writeFile').eraseLog;

function result(obj){
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


}

router.get('/', function(req, res){
    var obj={};
    result(obj);
       
    var msg="\n";
    if(obj.class == 0){
        if(27-obj.temperature >= 20){
            msg+="Cold outside!";
        }
        else msg+="Good~";
    }
    else if(obj.class == 1){
        if(obj.temperature-5 >= 20){
            msg+="Hot outside!";
        }
        else msg+="nice~";
    }
    
    if(obj.weather =="Rain")
        msg+="\nTake your umbrella";
    
    console.log(msg);
    res.send(msg);
    res.end();
    console.log("data has sent!");
    eraseLog();
});


module.exports = router;