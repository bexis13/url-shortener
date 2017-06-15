var express = require("express");
var app = express();
var path = require("path");

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/new/:id", function(request, response){
    
    response.send(request.params.id);
    
})

app.listen(port, function(){
    console.log("app is listening on port");
})