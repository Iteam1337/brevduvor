module ApolloReactTesting = {
  module MockedProvider = {
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make:
      (
        ~cache: ReasonApolloTypes.apolloCache,
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
  let make = (~addTypename=true, ~children, ~mocks=[||]) => {
    let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();

    <ApolloReactTesting.MockedProvider addTypename cache=inMemoryCache mocks>
      children
    </ApolloReactTesting.MockedProvider>;
  };
};

module ReactTestUtils = {
  [@bs.module "react-dom/test-utils"] [@bs.val]
  external act: (unit => unit) => unit = "act";
};

[@bs.module "@testing-library/react"]
external waitForElement: (unit => Dom.element) => Js.Promise.t('a) =
  "waitForElement";

[@bs.module "@testing-library/react"]
external wait: unit => Js.Promise.t('a) = "wait";
