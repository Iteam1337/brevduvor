[@react.component]
let make = (~token) => {
  let url = ReasonReactRouter.useUrl();

  let (loggedIn, setLoggedIn) =
    React.useState(_ =>
      switch (token) {
      | Some(_) => true
      | None => false
      }
    );

  let handleLogin = (payload: Auth.Payload.t) => {
    setLoggedIn(_ => true);
    Auth.Storage.setLoginToken(payload.token);
  };

  loggedIn
    ? switch (url.path) {
      | [] => <Start />
      | ["boka-resa"] => <Book />
      | ["resor"] => <Trips />
      | ["resa", id] => <Trip id />
      | _ => <p> "404. Not found"->React.string </p>
      }
    : <Login onLogin=handleLogin />;
};