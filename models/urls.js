var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create our url schema
var urlModelSchema = new Schema({
    name : {type: String}
},
{
    timestamps : true
});


//create our url model --> mongoose will pluralize it
var urlModels = mongoose.model("urlModel", urlModelSchema);

module.exports = urlModels;

