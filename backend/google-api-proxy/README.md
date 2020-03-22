# Google Data Proxy (REST4)
Find out more about the integration of the Google Data Proxy into the Liveline Application in the [Livelane Microservices Structure](https://docs.google.com/document/d/1RLdGLrOS8xFzT58jS5aggvNy8lCMdPbxYCEXZ2F2ziw/edit).

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
### /supermarkets
Get data for all supermarkets in the range of 3km around the specified coordinates (latitude, longitude). You will get an array of objects, sorted by distance in ascending order (first element is closet to the given coordinates).
            
      GET /supermarkets?lat=<lat>&lon=<lon>

Example: `http://localhost:8080/supermarkets?lat=49.315920&lon=8.432910`

### /supermarket
Get data for one supermarket based on the given [placeId](https://developers.google.com/places/place-id?hl=de)
            
      GET /supermarket?placeId=<placeId>

Example: `http://localhost:8080/supermarket?placeId=ChIJmQpxb3-1l0cR4ku8vF1UQ4E`

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
