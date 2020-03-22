![Google-API-Proxy-Titelbild](https://user-images.githubusercontent.com/37160523/77240094-46a1a100-6be2-11ea-80f1-86ffc4cfb7af.jpg)
Find out more about the integration of the Google Data Proxy (REST4) into the Liveline Application in the [Livelane Microservices Structure](https://docs.google.com/document/d/1RLdGLrOS8xFzT58jS5aggvNy8lCMdPbxYCEXZ2F2ziw/edit).

[Node.js](https://nodejs.org/de/download/) needs to be installed on your machine before you can go on.

## How to use?
In order to use this API, clone this project to your local machine. Then navigate to the backend folder.

Copy the `.env.example` file and name it `.env`. Open it and enter your Google API key. Note that the `.env` file will be ignored by git.

In order to start the server run the following commands inside the backend folder:

      npm install
      npm run build
      npm run start

or

      yarn install
      yarn build
      yarn start

## API Endpoints
### /supermarkets/location
Get data for all supermarkets in the range of 3km around the specified coordinates (latitude, longitude). You will get an array of objects, sorted by distance in ascending order (first element is closet to the given coordinates).
            
      GET /supermarkets/location?lat=<lat>&lon=<lon>

Example: `http://localhost:8080/supermarkets/location?lat=49.315920&lon=8.432910`

### /supermarkets/placeId
Not yet implemented

### /supermarket/location
This API is suited for you if you just want to retrieve the closest supermarket in the range of 3km around the specified coordinates (latitude, longitude). Note that the output should be equal to the first element of `/supermarkets/location`. That's why you could also call `/supermarkets/location` and just work with the first element of the array of objects. However, this endpoint has less overhead (reduces API calls to Google Places API) and is thus to be preferred when only dealing with the closet supermarket.

      GET /supermarket/location?lat=<lat>&lon=<lon>

Example: `http://localhost:8080/supermarket/location?lat=49.315920&lon=8.432910`

### /supermarket/placeId
Get data for one single supermarket based on the given [placeId](https://developers.google.com/places/place-id?hl=de)
            
      GET /supermarket/placeId?placeId=<placeId>

Example: `http://localhost:8080/supermarket/placeId?placeId=ChIJmQpxb3-1l0cR4ku8vF1UQ4E`

### API Response
This is an example for the API response you can expect:
```javascript
[
   {
      "placeId": "ChIJmQpxb3-1l0cR4ku8vF1UQ4E",
      "distance": 100, (optional)
      "name": "REWE",
      "formatted_address": "Waldspitzweg 3, 67105 Schifferstadt, Germany",
      "location": {
         "lat": 49.3831945,
         "lng": 8.3930197
      },
      "status": "ok",
      "week": [
         {
            "day": "Sun",
            "hours": []
         },
         {
            "day": "Mon",
            "hours": [
               {
                  "hour": 6,
                  "percentage": 0
               },
               {
                  "hour": 7,
                  "percentage": 18
               },
               {
                  "hour": 8,
                  "percentage": 32
               },
               {
                  "hour": 9,
                  "percentage": 49
               },
               {
                  "hour": 10,
                  "percentage": 62
               },
               {
                  "hour": 11,
                  "percentage": 68
               },
               {
                  "hour": 12,
                  "percentage": 65
               },
               {
                  "hour": 13,
                  "percentage": 60
               },
               {
                  "hour": 14,
                  "percentage": 62
               },
               {
                  "hour": 15,
                  "percentage": 71
               },
               {
                  "hour": 16,
                  "percentage": 81
               },
               {
                  "hour": 17,
                  "percentage": 78
               },
               {
                  "hour": 18,
                  "percentage": 62
               },
               {
                  "hour": 19,
                  "percentage": 38
               },
               {
                  "hour": 20,
                  "percentage": 18
               },
               {
                  "hour": 21,
                  "percentage": 6
               },
               {
                  "hour": 22,
                  "percentage": 0
               },
               {
                  "hour": 23,
                  "percentage": 0
               }
            ]
         },
         ...
      ]
   },
   ...
]
```

## How to set up for development?
Clone the project to your local machine.

Run the following commands inside the backend folder:
      
      npm install
      npm run start:dev

or

      yarn install
      yarn start:dev

Note that the `start:dev` script will run with nodemon, so the server will automatically restart if you make changes to the source code.
