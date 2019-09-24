module GeoPosition = {
  [@bs.deriving jsConverter]
  type t = {
    alias: string,
    lat: float,
    lon: float,
  };

  let empty = {alias: "", lat: 0.0, lon: 0.0};
};

module Drone = {
  [@decco]
  type status =
    | Initiating
    | InProgress
    | Other(string);

  type t = {
    batteryStatus: int,
    bearing: int,
    departure: string,
    eta: string,
    id: string,
    status: string,
  };

  let make = data => {
    batteryStatus: data##batteryStatus,
    bearing: data##bearing,
    departure: data##departure,
    eta: data##eta,
    id: data##id,
    status: data##status,
  };
};