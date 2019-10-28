[@react.component]
let make = () => {
  open Shared;

  let ({errorToString}, changeLocale): LocaleContext.t = LocaleContext.use();

  let url = ReasonReactRouter.useUrl();

  let (loggedIn, setLoggedIn) =
    React.useState(_ => AuthStorage.getLoginToken()->Belt.Option.isSome);

  let handleLogin = (payload: Shared.AuthPayload.t) => {
    setLoggedIn(_prev => true);

    AuthStorage.setLoginToken(payload.token);

    changeLocale(
      LocaleContext.SetLocale(
        payload.language->Belt.Option.getWithDefault(`SWEDISH),
      ),
    );
  };

  loggedIn
    ? switch (url.path) {
      | [] => <Book />
      | ["resor"] => <Trips />
      | ["resa", id] => <Trip id />
      | _ => <Typography.Error> {errorToString(FourOFour)} </Typography.Error>
      }
    : <Login onLogin=handleLogin />;
};