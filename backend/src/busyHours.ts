// modified version of https://github.com/rak-trzustki/busy-hours
import fetch from 'node-fetch';
import googleMaps, { PlaceDetailsResult } from '@google/maps';

export async function getBusyHours(placeId: string, apiKey: string | undefined): Promise<object> {
    if (!(placeId && apiKey)) {
        return {
            status: 'error',
            message: 'Place_ID or API key missing'
        };
    }

    // https://www.npmjs.com/package/@google/maps
    const googleMapsClient = googleMaps.createClient({
        key: apiKey,
        Promise: Promise
    });

    try {
        const place = await googleMapsClient.place({ placeid: placeId }).asPromise();
        const placeResult: PlaceDetailsResult = place.json.result;
        const { name, formatted_address, geometry: { location } } = placeResult;
        const html: string = await fetchHtml(placeResult.url);
        return Object.assign({ name, formatted_address, location }, getWeekData(html));
    } catch (err) {
        const errorMsg: string = ('json' in err) ? err.json : err;
        console.error(err);
        return { status: 'error', message: 'Error: ' + errorMsg };
    }
}

interface WeekData {
    week: DayDistribution[];
    now?: object;
}

interface DayDistribution {
    day: string;
    hours: HourPercentage[];
}

interface HourPercentage {
    hour: number;
    percentage: number;
}

function getWeekData(html: string): object {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const popularTimes = extractPopularTimes(html);
    if (!popularTimes) {
        return { status: 'error', message: 'Place has no popular hours' };
    }
    const week: DayDistribution[] = [];
    for (let i = 0; i < 7; i++) {
        let hours: object[] = [];
        if (popularTimes[0][i] && popularTimes[0][i][1]) {
            hours = popularTimes[0][i][1].map((array: object[]) => formatHourPercentage(array));
        }
        week.push({
            day: weekdays[i],
            hours: hours as HourPercentage[]
        });
    }
    const data: WeekData = {
        week: week
    };

    // Data available for right now?
    const crowdedNow = popularTimes[7];
    if (crowdedNow !== undefined) {
        data.now = formatHourPercentage(crowdedNow);
    }

    return data;
}

// really hacky script ;)
function extractPopularTimes(html: string) {
    const str = ['APP_INITIALIZATION_STATE=', 'window.APP_FLAGS']
    const script = html.substring(html.lastIndexOf(str[0]) + str[0].length, html.lastIndexOf(str[1]));
    const first = eval(script);
    const second = eval(first[3][6].replace(")]}'", ""));

    // https://github.com/rak-trzustki/busy-hours/issues/8#issuecomment-527427983
    return second[6][84];
    // return second[0][1][0][14][84];
}

function formatHourPercentage(array: object[]): HourPercentage {
    return {
        hour: Number(array[0]),
        percentage: Number(array[1])
    };
}

async function fetchHtml(url: string): Promise<string> {
    try {
        const htmlPromise = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
            }
        });
        return await htmlPromise.text();
    } catch (err) {
        console.error(err);
        return '';
    }
}
