[@react.component]
let make =
    (
      ~currentDestination: option(Shared.GeoPosition.t),
      ~currentPosition: option(Shared.GeoPosition.t),
    ) => {
  switch (currentPosition, currentDestination) {
  | (Some({lat: pLat, lon: pLon}), Some({lat: dLat, lon: dLon})) =>
    <>
      <MarkerIcon.Position latitude=pLat longitude=pLon />
      <MarkerIcon.Destination latitude=dLat longitude=dLon />
    </>
  | (Some({lat, lon}), None) =>
    <MarkerIcon.Position latitude=lat longitude=lon />
  | (None, Some({lat, lon})) =>
    <MarkerIcon.Position latitude=lat longitude=lon />
  | (None, None) => React.null
  };
};