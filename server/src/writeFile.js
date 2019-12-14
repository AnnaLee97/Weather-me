var express = require('express');
var fs = require('fs');

const filename = "./src/obj.txt";

module.exports={
    writeLog(data){
        console.log("write log: "+data);
        return fs.appendFileSync(filename, data+"\n");
    },
    eraseLog(){
        fs.writeFileSync(filename,"");
        console.log("log file reduced");
    }
    /*
    getLog(obj){
        fs.readFile(filename,'utf8', function(err, temp){
            if(err) throw err;
            console.log(temp);
            var arr = temp.toString().split('\n');
            for(var i=0; i<arr.length ;i++){
                console.log(arr[i]);
                if(arr[i].charAt(0)=='w')
                    obj.weather = arr[i].slice(1);
                else if(arr[i].charAt(0)=='t')
                    obj.temperature = arr[i].slice(1);
                else if(arr[i].charAt(0)=='c') obj.class = arr[i].slice(1);
            }
            console.log(obj.weather);
        });
        //console.log(obj.weather);
        return JSON.stringify(obj);
    }
    */
};