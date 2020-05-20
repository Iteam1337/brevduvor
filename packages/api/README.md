# API

## Getting started

Create a `config.json`-file in the root of the API.

```json
{
  "JWT_PRIVATE_KEY": "CAN_BE_ANYTHING_DURING_DEVELOPMENT"
}
```

For drone integration through flypulse, also add following to `config.json`

```json
{
  "FLYPULSE": {
    "USER": "<PROVIED_BY_FLYPULSE>",
    "PASSWORD": "<PROVIED_BY_FLYPULSE>",
    "HOST": "<PROVIED_BY_FLYPULSE>",
    "WS": "<PROVIED_BY_FLYPULSE>"
  },
  "DRONE":  // Drone id
}
```

```sh
npm install

docker-compose up -d
npm run migrate:up

npm start
npm generate
```

### Adding a development-user

In order to test things out in the client you'll most probably need a test-user.

```sh
npm run seed # creates users: johnny1@email.com and johnny@email.com with password 12341234
```

You can reach the GraphQL-endpoint at: http://localhost:4000/graphql

## Push notifications

Add `firebaseServiceAccount.json` in root with information provided in your Firebase-account.
