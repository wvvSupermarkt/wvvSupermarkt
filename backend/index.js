var express = require('express');
var app = express();
app.use('/', express.static('../frontend/webapp/'));
var port = 8080;
const busy_hours = require('busy-hours');

app.listen(8080, function () {
    console.log("Running at port: " + port)
});


app.get("/supermarkets", function (req, res) {
    var placeId = req.query.placeId;
    if(placeId){
        getTrafficByPlaceId(placeId,function(data){
            res.json([data])
        });
    }else{
         res.statusCode= 422;
         res.end();
    }
})


function getTrafficByPlaceId(placeId,cb){
    busy_hours(placeId, "AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk").then(data => {
        console.log("try log:")
        console.log(JSON.stringify(data,null,3)); 
        if(cb){
            cb(data)
        }
     });
}
app.post("/traffic", function (req, res) {
    var long = req.query.long
    var lat = req.query.lat
    //new trafficReport(long,lat)
    res.end();
})

function trafficReport(long, lat) {
    //find next supermarket
    //validate locataion is supermarket
    //rate supermarket
}