type h = {msg: string};

[@react.component]
let make = () => {
  open Shared;

  let (_, changeLocale): LocaleContext.t = LocaleContext.use();

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

  let s = {"className": "hey"};

  <div>
    {loggedIn
       ? switch (url.path) {
         | [] => <Book />
         | ["resor"] => <Trips />
         | ["resa", id] => <Trip id />
         | _ => <Typography.Error> FourOFour </Typography.Error>
         }
       : <Login onLogin=handleLogin />}
    <Utils.Spread props=s> <Toast.Container /> </Utils.Spread>
  </div>;
};