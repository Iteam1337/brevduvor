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
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make: (~mocks: array(Js.t('mocks))) => React.element =
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

/* TODO: use this mockprovider in tests */
module MockedProvider = {
  /* use MockLink and stuff similar to MySkills here */
  /* let client = {}; */

  [@react.component]
  let make = (~addTypename=false, ~children, ~mocks=[||]) => {
    <ApolloReactTesting.MockedProvider addTypename mocks>
      children
    </ApolloReactTesting.MockedProvider>;
  };
};
