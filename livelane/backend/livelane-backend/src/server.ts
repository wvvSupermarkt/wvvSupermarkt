require('dotenv').config();
import express from 'express';
import request from 'request-promise';
import bodyParser from 'body-parser'
import * as interfaces from "./interfaces";
import * as dbHandler from "./dbHandler";
import * as fs from "fs";
import * as http from "http"
var google_conf = {
  "username": process.env.PROXY_API_HOST,
  "password": process.env.PROXY_API_PASSWORD,
  "url": process.env.PROXY_API_URL
}
const app = express();

app.get('/supermarket/place', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  var lat = req.query.lat
  var lon = req.query.lon
  if (!(lat && lon)) {
    return res.status(442).json({ error: "You need to specify lat and lon as query params" });
  }

  try {

    var supermarket_list = await getSuperMarketList(lat, lon);

    if (supermarket_list === undefined) {
      res.send("There was an error while transmitting the data");
    } else {
      res.json(supermarket_list)
    }
  }
  catch (err) {
    res.status(500).json({ error: "Sorry, an internal server error occurred" });
  }


});
app.get('/supermarket/allArticles', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  try {

    var allarticle_list = await getAllArticles();

    if (allarticle_list === undefined) {
      res.send("There was an error while transmitting the data");
    } else {
      res.json(allarticle_list)
    }
  }
  catch (err) {
    res.status(500).json({ error: "Sorry, an internal server error occurred" });
  }


});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);


async function getAllArticles(): Promise<interfaces.ArticleMin[]> {
  var connection = await dbHandler.creatDB();
  var allArticles = await dbHandler.getAllArticlesFromDb(connection)

  connection.end();
  return allArticles
}

async function getGoogleDataRest4_lat_long(lat: number, lon: number): Promise<interfaces.SupermarketGoogle[]> {

  var username = google_conf.username;
  var password = google_conf.password;
  var url = google_conf.url + "/google/supermarkets/location?lon=" + lon + "&lat=" + lat
  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64")
  var contents = await request({ url: url, headers: { "Authorization": auth } });

  var obj: interfaces.SupermarketGoogle[] = JSON.parse(contents);
  return obj;

}
async function getSuperMarketList(lat: number, lon: number): Promise<interfaces.SupermarketResp[]> {
  var connection = await dbHandler.creatDB();


  var completeSupermarketList = await getGoogleDataRest4_lat_long(lat, lon)


  var supermarketRespList: interfaces.SupermarketResp[] = [];
  for (const supermarket of completeSupermarketList) {
    if (supermarket.status == 'error') {
      continue
    }
    var occupancy = await dbHandler.getCapacityOfSupermarket(supermarket.placeId, connection);
    var actualoccupancy = getActualOccupancyrel(supermarket);
    if (occupancy == -1) {
      occupancy = actualoccupancy
    }
    var articles = await dbHandler.getMissingArticles(supermarket.placeId, connection);


    supermarketRespList.push({
      name: supermarket.name,
      placeId: supermarket.placeId,
      formatted_address: supermarket.formatted_address,
      occupancy: occupancy,
      articles: articles
    }
    )
  }
  connection.end();
  return supermarketRespList;
}

function getActualOccupancyrel(supermarket: interfaces.SupermarketGoogle): number {
  var count = 0;
  var avg = 0;
  for (const day of supermarket.week) {
    for (const hour of day.hours) {
      count++
      avg += hour.percentage
    }
  }
  avg = avg / count
  var now = getActualOccupancy(supermarket)
  if (now == -1) {
    return (-1)
  }
  if (now - avg < 0) {
    return 1;
  } else {
    return 2
  }
}
function getActualOccupancy(supermarket: interfaces.SupermarketGoogle): number {
  var d = new Date();
  var wday = d.getDay()
  var hournow = d.getHours()
  var wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  for (const day of supermarket.week) {

    if (day.day == wdays[wday]) {
      for (const hour of day.hours) {
        if (hour.hour == hournow) {
          return hour.percentage
        }
      }
    }

  }

  return -1
}