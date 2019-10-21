[@react.component]
let make = () => {
  open Shared;

  let url = ReasonReactRouter.useUrl();

  let (loggedIn, setLoggedIn) =
    React.useState(_ => AuthStorage.getLoginToken()->Belt.Option.isSome);

  let handleLogin = (payload: Shared.AuthPayload.t) => {
    setLoggedIn(_prev => true);
    AuthStorage.setLoginToken(payload.token);
  };

  loggedIn
    ? switch (url.path) {
      | [] => <Start />
      | ["boka-resa"] => <Book />
      | ["resor"] => <Trips />
      | ["resa", id] => <Trip id />
      | _ => <Typography.Error> I18n.Error.FourOFour </Typography.Error>
      }
    : <Login onLogin=handleLogin />;
};