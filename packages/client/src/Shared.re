module GeoPosition = {
  [@bs.deriving jsConverter]
  type t = {
    alias: string,
    lat: float,
    lon: float,
  };

  let empty = {alias: "", lat: 0.0, lon: 0.0};
};