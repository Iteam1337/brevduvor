module GeoPosition = {
  [@bs.deriving jsConverter]
  type t = {
    alias: string,
    lat: float,
    lon: float,
  };

  [@bs.deriving jsConverter]
  type coords = {
    lat: float,
    lon: float,
  };

  let empty = {alias: "", lat: 0.0, lon: 0.0};

  let toRecord = destination => {
    alias: destination##alias,
    lat: destination##lat,
    lon: destination##lon,
  };
};

module Drone = {
  module Status = {
    type t =
      | InProgress
      | Initiating
      | Arrived
      | Other(string);

    let ofString =
      fun
      | "in progress" => InProgress
      | "initiating" => Initiating
      | "arrived" => Arrived
      | other => other->Other;
  };

  type t = {
    id: string,
    currentPos: GeoPosition.coords,
    batteryStatus: int,
    status: Status.t,
    start: GeoPosition.t,
    stop: GeoPosition.t,
  };

  let make = data => {
    id: data##id,
    currentPos: data##currentPos->GeoPosition.coordsFromJs,
    batteryStatus: data##batteryStatus,
    status: data##status->Status.ofString,
    start: data##start->GeoPosition.tFromJs,
    stop: data##stop->GeoPosition.tFromJs,
  };
};

module AuthPayload = {
  type t = {
    id: string,
    email: string,
    token: string,
    language: option(I18n.Locale.t),
  };

  let make = payload => {
    id: payload##login##id,
    email: payload##login##email,
    token: payload##login##token,
    language: payload##login##language,
  };
};

module AuthStorage = {
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