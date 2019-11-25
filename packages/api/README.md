# API

## Getting started

Create a `config.json`-file in the root of the API.

```json
{
  "JWT_PRIVATE_KEY": "CAN_BE_ANYTHING_DURING_DEVELOPMENT"
}
```

```sh
npm install

docker-compose up -d
npm run migrate up/down

npm start
npm generate
```

### Adding a development-user

In order to test things out in the client you'll most probably need a test-user.
To create one, navigate to: `http://localhost:4000/graphql` and use the following query. Feel free
to change the credentials.

```
mutation{
  register(input: {
    email: "test@email.com",
    username: "Jane"
    password: "1234"
    confirmPassword: "1234"
  })
  {
    id
    token
    username
  }
}
```

You can reach the GraphQL-endpoint at: http://localhost:4000/graphql
