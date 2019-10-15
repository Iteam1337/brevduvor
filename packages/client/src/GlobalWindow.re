module Navigator = {
  [@bs.deriving abstract]
  type geoOptions = {enableHighAccuracy: bool};
  [@bs.deriving {jsConverter: newType}]
  type coordinates = {
    latitude: float,
    longitude: float,
  };
  [@bs.deriving jsConverter]
  type position = {
    coords: abs_coordinates,
    timestamp: int,
  };
  [@bs.scope ("navigator", "geolocation")] [@bs.val]
  external _getCurrentPosition:
    (Js.t('a) => unit, Js.t('error) => unit, geoOptions) => unit =
    "getCurrentPosition";
  let getCurrentPosition = cb => {
    _getCurrentPosition(
      pos => {
        let positionAsRecord = positionFromJs(pos);
        let coords = coordinatesFromJs(positionAsRecord.coords);
        cb(coords);
      },
      Js.log,
      geoOptions(~enableHighAccuracy=true),
    );
  };

  [@bs.scope "navigator"] [@bs.val] external language: string = "language";
};
