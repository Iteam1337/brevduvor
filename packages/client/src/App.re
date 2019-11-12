[@react.component]
let make = () => {
  open Shared;

  let (_, changeLocale): LocaleContext.t = LocaleContext.use();

  let (_, dispatch) = AlertContext.use();

  let url = ReasonReactRouter.useUrl();

  let (loggedIn, setLoggedIn) =
    React.useState(_ => AuthStorage.getLoginToken()->Belt.Option.isSome);

  let handleLogin = (payload: Shared.AuthPayload.t) => {
    setLoggedIn(_prev => true);

    AuthStorage.setLoginToken(payload.token);
    Belt.Option.(
      payload.language
      ->map(userLang => changeLocale(SetLocale(userLang)))
      ->getWithDefault()
    );
  };

  React.useEffect0(() => {
    dispatch(Info(I18n.Translations.BookTrip_GoToOverview_Button));
    let interval =
      Js.Global.setTimeout(
        () => {
          dispatch(Clear);
          Js.log("Ey yo");
        },
        3000,
      );
    Some(() => Js.Global.clearTimeout(interval));
  });

  <div>
    {loggedIn
       ? switch (url.path) {
         | [] => <Book />
         | ["resor"] => <Trips />
         | ["resa", id] => <Trip id />
         | _ => <Typography.Error> FourOFour </Typography.Error>
         }
       : <Login onLogin=handleLogin />}
    <Toast />
  </div>;
};