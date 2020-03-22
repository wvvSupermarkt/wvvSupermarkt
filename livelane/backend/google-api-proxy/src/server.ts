require('dotenv').config();
import express from 'express';
const app = express();
import { getPlacesByGeoData, getTrafficByPlaceId, getPlaceByGeoData } from './apiHandler';


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});

app.use('/', express.static('../frontend/webapp/index.html'));


///////////////////////////
// Multiple Supermarkets //
///////////////////////////
app.get("/google/supermarkets/location", async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (!(lat && lon)) {
        return res.status(442).json({ error: "You need to specify lat and lon as query params" });
    }
    try {
        const data: object = await getPlacesByGeoData(lat, lon);
        console.log(data)
        if (data === undefined) {
            res.send("There was an error while transmitting the data to the Google Places API");
        } else {
            res.json(data);
        }
    } catch (err) {
        res.status(500).json({ error: "Sorry, an internal server error occurred" });
    }
});

/////////////////////
// One Supermarket //
/////////////////////
app.get("/google/supermarket/location", async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (!(lat && lon)) {
        return res.status(442).json({ error: "You need to specify lat and lon as query params" });
    }
    try {
        const data: object = await getPlaceByGeoData(lat, lon);
        if (data === undefined) {
            res.send("There was an error while transmitting the data to the Google Places API");
        } else {
            res.json(data);
        }
    } catch (err) {
        res.status(500).json({ error: "Sorry, an internal server error occurred" });
    }
});

app.get("/google/supermarkets/place", async (req, res) => {
    const placeId = req.query.placeId;
    if (!placeId) {
        return res.status(442).json({ error: "You need to specify a placeId as query param" });
    }
    try {
        const data: object = await getTrafficByPlaceId(placeId);
        if (data === undefined) {
            res.send("There was an error while transmitting the data to the Google Places API");
        } else {
            res.json(data);
        }
    } catch (err) {
        res.status(500).json({ error: "Sorry, an internal server error occurred" });
    }
});
