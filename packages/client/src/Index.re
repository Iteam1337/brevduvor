[%bs.raw {| require("mapbox-gl/dist/mapbox-gl.css") |}];

[@decco]
type apolloHeaders = {authorization: string};
let createHeaders = token =>
  switch (token) {
  | Some(token) => Some({authorization: "Bearer " ++ token})
  | None => None
  };

module Setup = {
  [@react.component]
  let make = () => {
    let (token, setToken) = React.useState(() => None);

    let headers = createHeaders(token);

    let httpLink =
      switch (headers) {
      | None => ApolloLinks.createHttpLink(~uri=Config.graphqlEndpoint, ())
      | Some(headers) =>
        ApolloLinks.createHttpLink(
          ~uri=Config.graphqlEndpoint,
          ~headers=apolloHeaders_encode(headers),
          (),
        )
      };
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

    React.useEffect0(() => {
      let token = Auth.Storage.getLoginToken();

      setToken(_ => token);
      Some(() => ());
    });

    <ReasonApollo.Provider client>
      <ReasonApolloHooks.ApolloProvider client>
        <App token />
      </ReasonApolloHooks.ApolloProvider>
    </ReasonApollo.Provider>;
  };
};

ReactDOMRe.renderToElementWithId(<Setup />, "root");