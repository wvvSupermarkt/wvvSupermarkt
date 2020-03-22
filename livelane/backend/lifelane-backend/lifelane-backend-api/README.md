ONLY USE DB DATA!!! NO DATA FROM REST2
######################################################

Find out more about the integration of the LIVELANE BACKEND (REST3) into the Liveline Application in the [Livelane Microservices Structure](https://docs.google.com/document/d/1RLdGLrOS8xFzT58jS5aggvNy8lCMdPbxYCEXZ2F2ziw/edit).

[Node.js](https://nodejs.org/de/download/) needs to be installed on your machine before you can go on.

## How to use?
In order to use this API, clone this project to your local machine. Edit the file /dbconf.json whith the access data of your MySQL database. 
In order to start the server run the following commands inside the backend folder:

      npm install
      npm run build
      npm run start


## API Endpoints
### /supermarket/place      
      GET /google/supermarkets/location?lat=<lat>&lon=<lon>
Example: `http://localhost:3000/supermarket/place\?lon\=13.431771\&lat\=52.466738`


### /supermarket/allArticles
This API is suited for you if you just want to retrieve the closest supermarket in the range of 3km around the specified coordinates (latitude, longitude). Note that the output should be equal to the first element of `/google/supermarkets/location`. That's why you could also call `/google/supermarkets/location` and just work with the first element of the array of objects. However, this endpoint has less overhead (reduces API calls to Google Places API) and is thus to be preferred when only dealing with the closet supermarket.

      GET /google/supermarket/supermarket/allArticles

Example: `/google/supermarket/supermarket/allArticles`

### API Response
This is an example for the API response you can expect: 
`http://localhost:3000/supermarket/place\?lon\=13.431771\&lat\=52.466738`
```javascript
[
  {
    "name": "Rewe",
    "placeId": "ChIJ1dXplptPqEcRSLSpg84QiXA",
    "formatted_address": "Hermannstraße 158, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "dm-drogerie markt",
    "placeId": "ChIJw4E7tJtPqEcRyR39BC6FXX0",
    "formatted_address": "Hermannstraße 158a, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "Oriental Market",
    "placeId": "ChIJoe12N5pPqEcRqO7pfgJRXuM",
    "formatted_address": "Emser Str. 103/105, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "Lidl",
    "placeId": "ChIJO1QHaqRPqEcRJ1r5ccupsgg",
    "formatted_address": "Glasower Str. 42, 12051 Berlin, Germany",
    "occupancy": 2,
    "articles": [
      {
        "name": "Taschentücher",
        "hash": 2134,
        "availability": "0",
        "lastupdate": "2020-03-22T00:23:28.000Z"
      },
      {
        "name": "Klopapier",
        "hash": 2132,
        "availability": "0",
        "lastupdate": "2020-03-22T00:23:01.000Z"
      }
    ]
  },
  {
    "name": "Emser Späti",
    "placeId": "ChIJy2qgB3tPqEcRRNvk2dO1If8",
    "formatted_address": "Emser Str. 11, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "Alkehr Markt",
    "placeId": "ChIJy7VNwJ1PqEcRb_M1C71J3iU",
    "formatted_address": "Silbersteinstraße 11, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "ALDI Berlin-Neukölln",
    "placeId": "ChIJfV1jLJBPqEcRUDDgrKffSsA",
    "formatted_address": "Silbersteinstraße 146, 12051 Berlin, Germany",
    "occupancy": 2,
    "articles": []
  },
  {
    "name": "denn's Biomarkt",
    "placeId": "ChIJZ-utCZ5PqEcRA5M0gxg6vmQ",
    "formatted_address": "Karl-Marx-Straße 234, 12055 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "PENNY-Markt Discounter",
    "placeId": "ChIJXQ1rNYBNqEcRUPVOqJfrjmI",
    "formatted_address": "Emser Str. 1-2, 12051 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "Eurogida Neukölln I",
    "placeId": "ChIJG1xDOZ5PqEcR_CcnA0NRXhE",
    "formatted_address": "Karl-Marx-Straße 225, 12055 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  },
  {
    "name": "ALDI",
    "placeId": "ChIJuznaD55PqEcROCIhghYHNU0",
    "formatted_address": "Karl-Marx-Straße 231, 12055 Berlin, Germany",
    "occupancy": 2,
    "articles": []
  },
  {
    "name": "real",
    "placeId": "ChIJR7Gh-HVPqEcRWJrdPiZRkUM",
    "formatted_address": "Karl-Marx-Straße 231-235, 12055 Berlin, Germany",
    "occupancy": 1,
    "articles": []
  }
]
```

`http://localhost:3000/supermarket/allArticles`
```javascript
[
  {
    "name": "Taschentücher",
    "hash": 2134
  },
  {
    "name": "Klopapier",
    "hash": 2132
  }
]
```

## How to set up for development?
### Clone the project to your local machine.

### Paste your access data of your MySQL database in the dbconfig.json file.


### Run the following commands inside the backend folder:

      npm install
      npm run start:dev

Note that the `start:dev` script will run with nodemon, so the server will automatically restart if you make changes to
