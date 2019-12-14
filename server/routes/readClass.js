var express = require('express');
var router = express.Router();
var fs = require('fs');

const filename = "./src/classType.txt"
const writeLog = require('../src/writeFile').writeLog;

router.get('/', function(req, res){
    var _class;
    fs.readFile(filename, 'utf8', function(err, temp){
        if(err) throw err;
        _class = temp.toString();
        res.send(_class);
        res.end();
        console.log("class: "+_class);
        writeLog("c"+_class);
    });
});

module.exports = router;