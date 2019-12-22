var express = require('express');
var router = express.Router();
var fs = require('fs');

const filename = "./src/labels.txt"
const writeLog = require('../src/writeFile').writeLog;

router.get('/', function(req, res){
    var _class;
    fs.readFile(filename, 'utf8', function(err, temp){
        if(err) throw err;
        _class = temp.toString().split(' ');
        res.send(_class[2]);
        res.end();
        console.log("class: "+_class[2]);
        writeLog("c"+_class[2]);
    });
});

module.exports = router;