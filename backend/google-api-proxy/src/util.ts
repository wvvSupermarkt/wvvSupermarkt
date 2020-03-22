// Haversine implementation ?!
// check this again, what about radiants are they considered in cosine-function when passing lat
// where do these constants come from?
// please explain
export function calculateDistance(lat1s: number | string, lon1s: number | string, lat2s: number | string, lon2s: number | string) {
    const lat1: number = (typeof lat1s === "string") ? parseFloat(lat1s) : lat1s;
    const lon1: number = (typeof lon1s === "string") ? parseFloat(lon1s) : lon1s;
    const lat2: number = (typeof lat2s === "string") ? parseFloat(lat2s) : lat2s;
    const lon2: number = (typeof lon2s === "string") ? parseFloat(lon2s) : lon2s;

    const lat = (lat1 + lat2) / 2 * 0.01745;
    const dx = 111.3 * Math.cos(lat) * (lon1 - lon2);
    const dy = 111.3 * (lat1 - lat2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    distance = Math.round(distance * 100) * 10;
    return distance;
}
