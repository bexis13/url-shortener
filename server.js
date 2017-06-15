var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var urls = require("models/urls");

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/new/:id", function(request, response){
    
    var originalUrl = request.params.id;
    var urlInstance = new urlModels({name : originalUrl});
    
    urlInstance.save(function(err,data){
        
        if(err){
            throw err;
        }
        else{
           console.log(data); 
        }
    })
    
});

app.listen(port, function(){
    console.log("app is listening on port");
})