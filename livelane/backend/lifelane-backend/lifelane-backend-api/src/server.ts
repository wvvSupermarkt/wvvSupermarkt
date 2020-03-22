import express from 'express';
import bodyParser  from 'body-parser'
import * as interfaces from "./interfaces";
import * as dbHandler from "./dbHandler";
import * as fs from "fs";
const app = express();

app.get('/supermarket/place', async (req, res) => {
  var lat = req.query.lat
  var long = req.query.long
  if (!(lat && long)) {
    return res.status(442).json({ error: "You need to specify lat and lon as query params" });
  }

  try {
    
    var supermarket_list = await getSuperMarketList(lat, long);
    
    if (supermarket_list === undefined) {
      res.send("There was an error while transmitting the data to the Google Places API");
    } else {
      res.json(supermarket_list)
    }
  }
  catch (err) {
    res.status(500).json({ error: "Sorry, an internal server error occurred" });
  }


});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);



function getGoogleDataRest4place_id(place_id: number): interfaces.SupermarketGoogle[] {

  var contents = fs.readFileSync('', 'utf8');

  var obj: interfaces.SupermarketGoogle[] = JSON.parse(contents);
  return obj;

}
async function getGoogleDataRest4_lat_long(lat: number, long: number): Promise<interfaces.SupermarketGoogle[]> {

  var contents = fs.readFileSync('src/dummy_data/google_api.json', 'utf8');

  var obj: interfaces.SupermarketGoogle[] = JSON.parse(contents);
  return obj;

}
async function getSuperMarketList(lat: number, long: number): Promise<interfaces.SupermarketResp[]> {
  var connection =await dbHandler.creatDB();
  
  var completeSupermarketList = await getGoogleDataRest4_lat_long(lat, long)
  
  
  var supermarketRespList: interfaces.SupermarketResp[] = [];
  for (const supermarket of completeSupermarketList) {
    var occupancy = await dbHandler.getCapacityOfSupermarket(supermarket.placeId,connection);
    
    var articles = await dbHandler.getMissingArticles(supermarket.placeId,connection);

    
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