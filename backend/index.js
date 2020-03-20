var express = require('express');
var app = express();
app.use('/', express.static('../frontend/webapp/'));
var port = 8080;

app.listen(8080, function () {
    console.log("Running at port: " + port)
});


app.get("/supermarkets", function (req, res) {
    var long = req.query.long
    var lat = req.query.lat
    var response = [{
        lat: lat,
        long: long,
        name: "Edeka Kampmann",
        type: "Supermarkt",
        "weekday_text": [
            "Montag: 07:00–22:00 Uhr",
            "Dienstag: 07:00–22:00 Uhr",
            "Mittwoch: 07:00–22:00 Uhr",
            "Donnerstag: 07:00–22:00 Uhr",
            "Freitag: 07:00–22:00 Uhr",
            "Samstag: 07:00–22:00 Uhr",
            "Sonntag: Geschlossen"
        ],
        traffic: {
            mon: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            tues: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            wed: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            thurs: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            fri: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            sat: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            sun: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        }
    }]

    res.json(response)
})

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