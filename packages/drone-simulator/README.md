# Drone

## Getting started

Run these commands:

```sh
fnm/nvm use
npm install
docker-compose up -d
npm start
# or npm run dev for automatic reloading
```

## Endpoints

```js
/init - initialise a departure, simulates a drone on the way, continously sending its data
/setup - simulate what a drone might be sending (battery-status, coordinates etc)
```

## Map visualiser

```sh
fnm/nvm use
npm install
npm run dev
```

## Elastic / Kibana

1. After running `docker-compose up` insert the following command under `Dev Tools`

```
PUT locations
{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point"
      }
    }
  }
}
```

Navigate to Management, under Kibana, go to Index Patterns. Create a new index pattern and use the
suggested timestamp-field.

Make sure `location` and `timestamp` are listed as types `geo_point` and `date` respectively.

Navigate to Map. Click Add layer, select from Documents and pick our `location`-pattern.
