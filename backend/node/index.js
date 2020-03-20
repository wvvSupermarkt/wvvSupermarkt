var express = require('express');
var app = express();
app.use('/', express.static('../frontend/webapp'));

var port = 8080;

app.listen(8080,function(){
    console.log("Running at port: "+port)
});


app.get("/supermarkets",function(req,res){
var long =  req.query.long
var lat = req.query.lat
// getSupermarkets(long,lat)
})

