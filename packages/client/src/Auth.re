type loginDetails = {
  username: string,
  password: string,
};

module Payload = {
  type t = {
    id: string,
    username: string,
    token: string,
  };

  let make = payload => {
    id: payload##login##id,
    username: payload##login##username,
    token: payload##login##token,
  };
};

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

  let getLoginToken = () =>
    Dom.Storage.getItem(keyToStr(LoginToken), storage);

  let unsetLoginToken = () => {
    storage |> Dom.Storage.removeItem(keyToStr(LoginToken));
  };
};