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
      | "Initiating" => Initiating
      | "Arrived" => Arrived
      | other => other->Other;
  };

  type t = {
    batteryStatus: int,
    bearing: int,
    departure: string,
    eta: string,
    id: string,
    status: Status.t,
    currentPos: GeoPosition.coords,
  };

  let make = data => {
    batteryStatus: data##batteryStatus,
    currentPos: data##currentPos->GeoPosition.coordsFromJs,
    bearing: data##bearing,
    departure: data##departure,
    eta: data##eta,
    id: data##id,
    status: data##status->Status.ofString,
  };
};