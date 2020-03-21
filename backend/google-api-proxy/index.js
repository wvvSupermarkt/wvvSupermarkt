require('dotenv').config();

var express = require('express');
var app = express();
const fetch = require('node-fetch');

app.use('/', express.static('../frontend/webapp/'));
var port = 8080;
const busy_hours = require('busy-hours');

app.listen(8080, function () {
    console.log("Running at port: " + port)
});

app.get("/supermarkets/location",async function (req, res) {
    var long = req.query.long;
    var lat = req.query.lat;
    if (!lat || !long) {
        res.statusCode = 422;
        res.end();
    } else {
        try {
            res.json(await getPlacesByGeoData(long, lat));
        } catch (e) {
            console.log(e)
            res.statusCode = 500;
            res.end()
        }
    }
})

app.get("/supermarkets/place", async function (req, res) {
    var placeId = req.query.placeId;
    if (placeId) {
        try {
            var data = await getTrafficByPlaceId(placeId)
            res.json(data)
        } catch (e) {
            res.statusCode= 500;
            res.end()
        }
    } else {
        res.statusCode = 422;
        res.end();
    }
})


function getTrafficByPlaceId(placeId,lon,lat) {
    return new Promise(function (resolve, reject) {
        try {
            busy_hours(placeId, process.env.API_KEY).then(data => {
                console.log("try log:")
                console.log(JSON.stringify(data, null, 3));
                data.placeId= placeId;
                if(lon,lat){
                    data.distance = calculateDistance(data.location.lng,data.location.lat,lon,lat)
                }
                resolve(data)
            });
        }
        catch (e) {
            reject(e)
        }
    })
}



async function getPlacesByGeoData(long, lat) {
    const placeIds = await getPlaceIds(long, lat);
    console.log("PlaceIds: "+placeIds)
    const placeIdsEnriched = await enrichPlaceIds(placeIds,long,lat);
    console.log("PlaceIdsEnriched: " + placeIdsEnriched)
    return placeIdsEnriched;
}

async function getPlaceIds(lon, lat) {
    console.log(process.env.API_KEY)
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const params = `?location=${lat},${lon}&rankby=distance&type=supermarket&key=${process.env.API_KEY}`;
    try {
        const response = await fetch(baseUrl + params);
        const jsonData = await response.json();
        return extractPlaceIds(jsonData);
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function extractPlaceIds(jsonData) {
    const placeIds = [];
    jsonData.results.forEach((resultObj) => {
        placeIds.push(resultObj.place_id);
    });
    return placeIds;
}
async function enrichPlaceIds(placeIds,lon,lat) {
    const enriched = await Promise.all(placeIds.map((placeId) => {
        try {
            return getTrafficByPlaceId(placeId,lon,lat)

        } catch (err) {
            console.log(err);
        }
    }));
    console.log(enriched);
    return enriched;
}

function calculateDistance(lon1,lat1,lon2,lat2){
    lon1 =parseFloat(lon1)
    lon2 = parseFloat(lon2)
    lat1 = parseFloat(lat1)
    lat2 = parseFloat(lat2)
lat = (lat1 + lat2) / 2 * 0.01745
dx = 111.3 * Math.cos(lat) * (lon1 - lon2)
dy = 111.3 * (lat1 - lat2)
distance = Math.sqrt(dx * dx + dy * dy)
distance = Math.round(distance*100)*10
console.log(distance)
return distance
}