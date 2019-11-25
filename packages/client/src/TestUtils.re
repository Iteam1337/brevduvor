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

  module MockedProvider2 = {
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make:
      (
        ~children: React.element,
        ~mocks: (Js.t('mocksA), Js.t('mocksB)),
        ~addTypename: bool
      ) =>
      React.element =
      "MockedProvider";
  };

  module MockedProvider3 = {
    [@bs.module "@apollo/react-testing"] [@react.component]
    external make:
      (
        ~children: React.element,
        ~mocks: (Js.t('mocksA), Js.t('mocksB), Js.t('mocksC)),
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

module MockedLocaleProvider = {
  [@react.component]
  let make = (~children, ~locale) => {
    let localeContextValue =
      React.useReducer(
        LocaleContext.reducer,
        {
          errorToString: I18n.Error._toString(locale),
          translationsToString: I18n.Translations._toString(locale),
        },
      );

    <LocaleProvider value=localeContextValue> children </LocaleProvider>;
  };
};

module MockedNotificationProvider = {
  [@react.component]
  let make = (~children) => {
    <Notifications.Provider> children </Notifications.Provider>;
  };
};

module MockedProvider = {
  [@react.component]
  let make = (~addTypename=true, ~children, ~mocks=[||], ~locale=`SWEDISH) => {
    <ApolloReactTesting.MockedProvider addTypename mocks>
      <MockedLocaleProvider locale>
        <MockedNotificationProvider> children </MockedNotificationProvider>
      </MockedLocaleProvider>
    </ApolloReactTesting.MockedProvider>;
  };
};

module MockedProvider2 = {
  [@react.component]
  let make =
      (~addTypename=true, ~children, ~mocks: ('a, 'b)=?, ~locale=`SWEDISH) =>
    <ApolloReactTesting.MockedProvider2 addTypename mocks>
      <MockedLocaleProvider locale>
        <MockedNotificationProvider> children </MockedNotificationProvider>
      </MockedLocaleProvider>
    </ApolloReactTesting.MockedProvider2>;
};

module MockedProvider3 = {
  [@react.component]
  let make =
      (
        ~addTypename=true,
        ~children,
        ~mocks: ('a, 'b, 'c)=?,
        ~locale=`SWEDISH,
      ) =>
    <ApolloReactTesting.MockedProvider3 addTypename mocks>
      <MockedLocaleProvider locale>
        <MockedNotificationProvider> children </MockedNotificationProvider>
      </MockedLocaleProvider>
    </ApolloReactTesting.MockedProvider3>;
};

module ReactTestUtils = {
  [@bs.module "react-dom/test-utils"] [@bs.val]
  external act: (unit => unit) => unit = "act";
};

[@bs.module "@testing-library/react"]
external waitForElement: (unit => Dom.element) => Js.Promise.t('a) =
  "waitForElement";

[@bs.module "@testing-library/react"]
external waitForElementToBeRemoved: (unit => Dom.element) => Js.Promise.t('a) =
  "waitForElementToBeRemoved";