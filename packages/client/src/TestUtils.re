module ApolloReactTesting = {
  module MockedProvider = {
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make:
      (
        ~children: React.element,
        ~mocks: array(Js.t('mocks)),
        ~addTypename: bool
      ) =>
      React.element =
      "MockedProvider";
  };

  module MockLink = {
    [@bs.module "@apollo/react-testing"] [@bs.new]
    external make:
      (~mocks: array(Js.t('mocks))) => ReasonApolloTypes.apolloLink =
      "MockLink";
  };

  [@bs.module "@apollo/react-testing"]
  external createClient:
    (
      ~data: Js.t('data),
      ~query: Js.t('query),
      ~variables: Js.t('variables)
    ) =>
    Js.t('normalisedCacheObject) =
    "createClient";
};

/** Why do we need this custom MockedProvider?
   In `@apolllo/react-testing` the MockedProvider is already provided with MockLink and a mocked
   client.

   But since we're also using the ReasonApolloHooks-provider we need to manually mock that.
   */
module MockedProvider = {
  [@react.component]
  let make = (~addTypename=false, ~children, ~mocks=[||]) => {
    let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();

    let client =
      ReasonApollo.createApolloClient(
        ~link=ApolloReactTesting.MockLink.make(~mocks),
        ~cache=inMemoryCache,
        (),
      );

    <ApolloReactTesting.MockedProvider addTypename mocks>
      <ReasonApolloHooks.ApolloProvider client>
        children
      </ReasonApolloHooks.ApolloProvider>
    </ApolloReactTesting.MockedProvider>;
  };
};

module ReactTestUtils = {
  [@bs.module "react-dom/test-utils"] [@bs.val]
  external act: (unit => Js.Promise.t(unit)) => Js.Promise.t(unit) = "act";
};

let wait = time =>
  Js.Promise.make((~resolve, ~reject as _r) =>
    Js.Global.setTimeout(
      () => {
        resolve(. 0);
        ();
      },
      time,
    )
    |> ignore
  )
  ->FutureJs.fromPromise(Js.String.make);
