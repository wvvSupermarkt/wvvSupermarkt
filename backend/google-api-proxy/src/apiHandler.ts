import fetch from 'node-fetch';
import { getBusyHours } from './busyHours';
import { calculateDistance } from './util';

export async function getPlacesByGeoData(lat: number, lon: number): Promise<object> {
    const placeIds: string[] = await getPlaceIds(lat, lon);
    // console.log("PlaceIds: " + placeIds);
    const placeIdsEnriched = await enrichPlaceIds(placeIds, lat, lon);
    // console.log("PlaceIdsEnriched: " + placeIdsEnriched);
    return placeIdsEnriched;
}

export async function getPlaceByGeoData(lat: number, lon: number): Promise<object> {
    const placeIds: string[] = await getPlaceIds(lat, lon);
    const firstPlaceIdEnriched = await enrichPlaceId(placeIds[0], lat, lon);
    return firstPlaceIdEnriched;
}

//////////////////////////////////////////
// Google Places API (directly via URL) //
//////////////////////////////////////////
async function getPlaceIds(lat: number, lon: number): Promise<string[]> {
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
async function enrichPlaceIds(placeIds: string[], lat: number, lon: number): Promise<object[]> {
    return await Promise.all(placeIds.map(async (placeId: string) => enrichPlaceId(placeId, lat, lon)));
}

function enrichPlaceId(placeId: string, lat: number, lon: number): Promise<object> {
    try {
        return getTrafficByPlaceId(placeId, lat, lon);
    } catch (err) {
        console.error(err);
        return Promise.resolve({});
    }
}

export function getTrafficByPlaceId(placeId: string, lat?: number, lon?: number): Promise<object> {
    return new Promise((resolve: any, reject: any) => {
        try {
            getBusyHours(placeId, process.env.GOOGLE_KEY).then((data: any) => {
                console.log(JSON.stringify(data, null, 3));
                if (lat && lon) {
                    data.distance = calculateDistance(data.location.lat, data.location.lng, lat, lon);
                }
                resolve(data);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}