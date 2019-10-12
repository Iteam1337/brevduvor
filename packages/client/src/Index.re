[%bs.raw {| require("mapbox-gl/dist/mapbox-gl.css") |}];

[@bs.deriving jsConverter]
type apolloHeaders = {authorization: string};

let setContextHeaders = () => {
  let token =
    Belt.Option.getWithDefault(Auth.Storage.getLoginToken(), "UNAUTHORISED");

  let headers = {authorization: "Bearer " ++ token};

  {"headers": apolloHeadersToJs(headers)};
};

module Setup = {
  [@react.component]
  let make = () => {
    let httpLink =
      ApolloLinks.createHttpLink(~uri=Config.graphqlEndpoint, ());
    let wsLink = ApolloLinks.webSocketLink(~uri=Config.graphqlWsUri, ());
    let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();
    let contextLink = ApolloLinks.createContextLink(() => setContextHeaders());

    let client =
      ReasonApollo.createApolloClient(
        ~link=
          ApolloLinks.from([|
            contextLink, // set auth headers on each request
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
          |]),
        ~cache=inMemoryCache,
        (),
      );
    Js.log(client);

    <ReasonApollo.Provider client>
      <ReasonApolloHooks.ApolloProvider client>
        <App />
      </ReasonApolloHooks.ApolloProvider>
    </ReasonApollo.Provider>;
  };
};

ReactDOMRe.renderToElementWithId(<Setup />, "root");
