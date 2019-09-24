[%bs.raw {| require("mapbox-gl/dist/mapbox-gl.css") |}];

let httpLink = ApolloLinks.createHttpLink(~uri=Config.graphqlEndpoint, ());
let wsLink = ApolloLinks.webSocketLink(~uri=Config.graphqlWsUri, ());
let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();

let client =
  ReasonApollo.createApolloClient(
    ~link=
      ApolloLinks.split(
        operation => {
          let operationDefition =
            ApolloUtilities.getMainDefinition(operation##query);
          operationDefition##kind == "OperationDefinition"
          &&
          operationDefition##operation == "subscription";
        },
        wsLink,
        httpLink,
      ),
    ~cache=inMemoryCache,
    (),
  );

ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client>
    <ReasonApolloHooks.ApolloProvider client>
      <App />
    </ReasonApolloHooks.ApolloProvider>
  </ReasonApollo.Provider>,
  "root",
);