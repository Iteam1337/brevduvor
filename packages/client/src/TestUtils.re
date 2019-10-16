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

module MockedProvider = {
  [@react.component]
  let make = (~addTypename=true, ~children, ~mocks=[||]) => {
    <ApolloReactTesting.MockedProvider addTypename mocks>
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
