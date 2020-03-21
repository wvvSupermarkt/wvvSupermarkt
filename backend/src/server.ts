require('dotenv').config();
import express from 'express';
const app = express();
import fetch from 'node-fetch';
import { getBusyHours } from './busyHours';

app.get('/', (_req, res) => {
    res.send("This is our supermarket API, go to our GitHub page to find out more about this API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});

//////////
// TEST //
//////////
// app.get("/test", function (_req, res) {
//     getBusyHours("ChIJMcjr-KO2l0cR-fUqy24AFgw", process.env.GOOGLE_KEY).then((data: any) => {
//         console.log(data);
//         res.send(data);
//     }).catch((err: any) => {
//         console.error(err);
//         res.send(err);
//     });
// });

app.get("/supermarkets", async function (req, res, next) {
    try {
        const lat = req.query.lat;
        const lon = req.query.lon;
        if (!(lat && lon)) {
            return res.status(442).json({ error: "The query parameters are not correctly specified" });
        }
        const answer: object = await getClosetSupermarketsGoogle(lat, lon);
        if (answer === undefined) {
            res.send("There was an error while transmitting the data to the Google Places API");
        }
        res.json(answer);
    } catch (err) {
        return next(err);
    }
});

////////////////////////////////////////////////////////////////

async function getClosetSupermarketsGoogle(lat: number, lon: number): Promise<object> {
    const placeIds: string[] = await getClosestSupermarketsPlaceIds(lat, lon);
    const placeIdsEnriched = await enrichPlaceIds(placeIds);
    return placeIdsEnriched;
}

//////////////////////////////////////////
// Google Places API (directly via URL) //
//////////////////////////////////////////
async function getClosestSupermarketsPlaceIds(lat: number, lon: number): Promise<string[]> {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const params = `?location=${lat},${lon}&rankby=distance&type=supermarket&key=${process.env.GOOGLE_KEY}`;
    try {
        const response = await fetch(baseUrl + params);
        const jsonData = await response.json();
        return extractPlaceIds(jsonData);
    } catch (err) {
        console.error(err);
        return [];
    }
}

function extractPlaceIds(jsonData: any): string[] {
    const placeIds: string[] = [];
    jsonData.results.forEach((resultObj: any) => {
        placeIds.push(resultObj.place_id);
    });
    return placeIds;
}

//////////////////////////////////////////////////////////////
// Google Places API (indirectly via npm-module busy-hours) //
//////////////////////////////////////////////////////////////
async function enrichPlaceIds(placeIds: string[]): Promise<object[]> {
    const enriched: object[] = await Promise.all(placeIds.map(async (placeId: string) => {
        try {
            return await getBusyHours(placeId, process.env.GOOGLE_KEY);
        } catch (err) {
            console.error(err);
        }
        return {};
    }));
    return enriched;
}
