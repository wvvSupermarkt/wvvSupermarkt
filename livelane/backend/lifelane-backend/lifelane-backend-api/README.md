ONLY USE DUMMY DATA!!! NO DATA FROM REST2/REST4
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
Example: `http://localhost:8080/google/supermarkets/location?lat=49.315920&lon=8.432910`


### /supermarket/allArticles
This API is suited for you if you just want to retrieve the closest supermarket in the range of 3km around the specified coordinates (latitude, longitude). Note that the output should be equal to the first element of `/google/supermarkets/location`. That's why you could also call `/google/supermarkets/location` and just work with the first element of the array of objects. However, this endpoint has less overhead (reduces API calls to Google Places API) and is thus to be preferred when only dealing with the closet supermarket.

      GET /google/supermarket/supermarket/allArticles

Example: `/google/supermarket/supermarket/allArticles`

### API Response
This is an example for the API response you can expect:
```javascript
[
    {
      "name": "LIDL",
      "placeId": "ChIJO1QHaqRPqEcRJ1r5ccupsgg",
      "formatted_address": "Glasower Str. 42, 12051 Berlin, Germany",
      "occupancy": 1,
      "aticles": [
        {
          "name": "Klopapier",
          "hash": "012708",
          "availability": 0,
          "lastupdate": "2020-03-21T22:21+01:00"
        },
        {
          "name": "Desinfektionsspray",
          "hash": "283723",
          "availability": 1,
          "lastupdate": "2020-03-21T22:21+01:00"
        }
      ]
    },
    {
      "name": "Netto",
      "placeId": "ChIJ1dKDoZtPqEcRM1AThFC0IPk-wk88Z89zM8",
      "formatted_address": "Hermannstraße 158A, 12051 Berlin, Germany",
      "occupancy": 1,
      "aticles": [
        {
          "name": "Taschentücher",
          "hash": "012708",
          "availability": 1,
          "lastupdate": "2020-03-21T22:21+01:00"
        },
        {
          "name": "Nudeln",
          "hash": "283723",
          "availability": 0,
          "lastupdate": "2020-03-21T22:10+01:00"
        }
      ]
    }
  ]

```

## How to set up for development?
### Clone the project to your local machine.

### Paste your access data of your MySQL database in the dbconfig.json file.


### Run the following commands inside the backend folder:

      npm install
      npm run start:dev

Note that the `start:dev` script will run with nodemon, so the server will automatically restart if you make changes to the source code.
