[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  let (loggedIn, setLoggedIn) = React.useState(_ => false);

  React.useEffect0(() => {
    let token = Auth.Storage.getLoginToken();
    switch (token) {
    | None => setLoggedIn(_ => false)
    | Some(_) => setLoggedIn(_ => true)
    };
    Some(_ => ());
  });

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