# client

## Environment

.env in project root:

```sh
 MAPBOX_TOKEN=<your_mapbox_token>
 GRAPHQL_API=<graphql_api_uri>
 GRAPHQL_WS_URI=<graphql_ws_uri>
```

## Run Project

```sh
npm install
```

Create introspection schema:

```sh
npm run schema
```

then:

```sh
npm start
# in another tab
npm run server
```

When both processes are running, open a browser at http://localhost:3000

## Testing

```
npm run cypress
```

This will build the project and run cypress against it. We use cypress and cucumber preprocessor with 'Given, When, Then' syntax, see cypress/integration for examples.

## Build for Production

```sh
npm run clean
npm run build
npm run webpack:production
```

This will replace the development artifact `build/Index.js` for an optimized
version as well as copy `public/index.html` into `build/`. You can then deploy the
contents of the `build` directory (`index.html` and `Index.js`).

If you make use of routing (via `ReasonReact.Router` or similar logic) ensure
that server-side routing handles your routes or that 404's are directed back to
`index.html` (which is how the dev server is set up).

**To enable dead code elimination**, change `bsconfig.json`'s `package-specs`
`module` from `"commonjs"` to `"es6"`. Then re-run the above 2 commands. This
will allow Webpack to remove unused code.
'
