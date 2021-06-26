# Covid Went There

Create a map view of all the public places visited by persons with COVID. Data is obtained from MOH's daily press release.

## Live Preview

You can find the website at https://covidwentthere.com which is hosted on Firebase.

## Stack

Typical React project. Just run `npm start` to run the app in development mode.\
Run `npm run build` for the production build. For Firebase hosting, it was necessary to point the `public` path to the `build` directory where the production build is generated

## API

The API is a static JSON file that's hosted on Google Cloud. I've a local instance that I'll run daily to parse, format, and upload onto GCP. There are two files, [master data](https://storage.googleapis.com/covidwentthere_mock/query.json) and the one that shows the [daily visits](https://storage.googleapis.com/covidwentthere_mock/daily.json)

You can update the contract for your own country/city.

## Customise

Simply get your own Google Maps API Key and set in on React's `.env` file in your project root. Use the key `REACT_APP_MAPS_KEY`. Do also update the default lat/lng to your country/city. This can be done in the [CustomMap](./src/map/CustomMap.js)
