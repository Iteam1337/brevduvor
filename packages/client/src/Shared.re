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
    id: string,
    currentPos: GeoPosition.coords,
    batteryStatus: int,
    status: Status.t,
  };

  let empty = {
    batteryStatus: 0,
    id: "none",
    status: Other("Empty"),

    currentPos: {
      lat: 0.0,
      lon: 0.0,
    },
  };

  let make = data => {
    switch (data) {
    | Some(data) => {
        id: data##id,
        currentPos: data##currentPos->GeoPosition.coordsFromJs,
        batteryStatus: data##batteryStatus,
        status: data##status->Status.ofString,
      }
    | None => empty
    };
  };
};