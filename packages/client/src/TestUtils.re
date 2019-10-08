module ApolloReactTesting = {
  module MockedProvider = {
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make:
      (~children: React.element, ~mocks: array(Js.t('mocks))) =>
      React.element =
      "MockedProvider";
  };
};
