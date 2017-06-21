var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var urlPairModel = require("./models/urls");
var validator = require("validator");

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

//connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/urlShortener");

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.on('open', function(){
    console.log("connected correctly to the database");
})

app.get("/new/:id(*)", function(request, response){
    
    var originalUrl = request.params.id;
    
    
    //check if it's a valid url
    if(!validator.isURL(originalUrl)){
        response.send({error: "you can enter only valid urls"})
    }
    //create a shortened url representation
    var shortCode = Math.floor(Math.random()*10000);
    //create new urlpair from url model
    var urlInstance = new urlPairModel({
        originalUrl : originalUrl,
        shortenedUrl : shortCode
    });
    console.log(urlInstance);
    
    //return back original url and shortened form
    response.send({
        originalUrl : originalUrl,
        shortenedUrl : shortCode
    });
    // //store both shortened and original url
    // var dbUrl = "mongodb://localhost:27017/urlShortener";
    // mongoose.connect(dbUrl);
    // var db = mongoose.connection;
    
    // db.on('error', console.error.bind(console , "connection error:"));
    // db.once('open', function(){
    //     urlPairModel.save(function(err,data){
    //         if(err){
    //             throw err;
    //         }
    //         else{
    //         db.close(); 
    //         response.send("saved in the database");
    //         }
    //     })
    // })
   
    
});

app.listen(port, function(){
    console.log("app is listening on port");
})