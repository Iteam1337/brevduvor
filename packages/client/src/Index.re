[%bs.raw {| require("mapbox-gl/dist/mapbox-gl.css") |}];

[@decco]
type apolloHeaders = {authorization: string};

module Setup = {
  [@react.component]
  let make = () => {
    let (headers, setHeaders) = React.useState(() => None);

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
      let headers =
        switch (token) {
        | Some(token) => {authorization: "Bearer " ++ token}
        | _ => {authorization: ""}
        };

      setHeaders(_ => Some(headers));
      Some(() => ());
    });

    <ReasonApollo.Provider client>
      <ReasonApolloHooks.ApolloProvider client>
        <App />
      </ReasonApolloHooks.ApolloProvider>
    </ReasonApollo.Provider>;
  };
};

ReactDOMRe.renderToElementWithId(<Setup />, "root");