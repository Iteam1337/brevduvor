[@react.component]
let make =
    (
      ~departingPosition: option(Shared.GeoPosition.t),
      ~currentDestination: option(Shared.GeoPosition.t),
      ~currentPosition: option(Shared.GeoPosition.coords),
    ) => {
  switch (departingPosition, currentDestination, currentPosition) {
  | (
      Some(departingPosition),
      Some(currentDestination),
      Some(currentPosition),
    ) =>
    <>
      <MarkerIcon.Position
        latitude={departingPosition.lat}
        longitude={departingPosition.lon}
      />
      <MarkerIcon.Destination
        latitude={currentDestination.lat}
        longitude={currentDestination.lon}
      />
      <MarkerIcon.Drone
        latitude={currentPosition.lat}
        longitude={currentPosition.lon}
      />
    </>
  | (Some({lat, lon}), None, _) =>
    <MarkerIcon.Position latitude=lat longitude=lon />
  | (None, Some({lat, lon}), _) =>
    <MarkerIcon.Position latitude=lat longitude=lon />
  | _ => React.null
  };
};
