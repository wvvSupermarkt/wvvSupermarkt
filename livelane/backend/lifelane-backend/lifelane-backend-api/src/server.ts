import express from 'express';
import bodyParser  from 'body-parser'
import * as interfaces from "./interfaces";
import * as dbHandler from "./dbHandler";
import * as fs from "fs";
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/supermarket/place', async (req, res) => {
  var lat = req.query.lat
  var long = req.query.long
  if (!(lat && long)) {
    return res.status(442).json({ error: "You need to specify lat and lon as query params" });
  }

  try {
    
    var supermarket_list = await getSuperMarketList(lat, long);
    
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


async function getAllArticles():Promise<interfaces.ArticleMin[]>{
  var connection =await dbHandler.creatDB();
  var allArticles=await dbHandler.getAllArticlesFromDb(connection)
  
  connection.end();
  return allArticles
}
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
