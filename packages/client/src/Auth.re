type loginDetails = {
  username: string,
  password: string,
};

type authPayload = {
  username: string,
  token: string,
};

let user = {username: "Kalle", password: "hunter2"};

module Storage = {
  type keys =
    | LoginToken
    | RefreshToken;

  let keyToStr = key => {
    switch (key) {
    | LoginToken => "LoginToken"
    | RefreshToken => "RefreshToken"
    };
  };

  let storage = Dom.Storage.localStorage;

  let setLoginToken = token =>
    storage |> keyToStr(LoginToken)->Dom.Storage.setItem(token);

  let getLoginToken = Dom.Storage.getItem(keyToStr(LoginToken));

  let unsetLoginToken = () => {
    storage |> Dom.Storage.removeItem(keyToStr(LoginToken));
  };
};