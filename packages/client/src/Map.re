open ReactMapGl;

type event =
  | UpdateViewState(DeckGL.viewState);

type state = {viewState: DeckGL.viewState};

let initialState =
  DeckGL.viewState(~longitude=19.837932, ~latitude=66.605854, ~zoom=10, ());

[@react.component]
let make =
    (
      ~initialViewState=?,
      ~departingPosition=?,
      ~currentDestination=?,
      ~currentPosition=?,
    ) => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | UpdateViewState(viewState) => viewState
        },
      initialViewState->Belt.Option.getWithDefault(initialState),
    );

  let handleFlyTo = (~zoom=8, ~lat, ~lon, ()) =>
    dispatch(
      UpdateViewState(
        DeckGL.viewState(
          ~longitude=lon,
          ~latitude=lat,
          ~zoom,
          ~transitionDuration=1000,
          ~transitionInterpolator=Interpolator.FlyTo.make(),
          (),
        ),
      ),
    );

  let flyToRoute = (position, destination) => {
    let viewport = [|position, destination|] |> Viewport.make;

    handleFlyTo(
      ~lat=viewport.latitude,
      ~lon=viewport.longitude,
      ~zoom=viewport.zoom,
      (),
    );
  };

  let (routes, setSkipRouteQuery) =
    UseGetRoute.use(~departingPosition, ~destination=currentDestination);

  React.useEffect1(
    () => {
      switch (departingPosition, currentDestination) {
      | (Some({Shared.GeoPosition.lon, lat}), None) =>
        handleFlyTo(~lat, ~lon, ())
      | (None, Some({Shared.GeoPosition.lon, lat})) =>
        handleFlyTo(~lat, ~lon, ())
      | (Some(pos), Some(dest)) =>
        flyToRoute([|pos.lon, pos.lat|], [|dest.lon, dest.lat|]);
        setSkipRouteQuery(_ => false);
      | _ => ()
      };

      None;
    },
    [||],
  );

  let layers =
    switch (routes) {
    | Data(data) =>
      let trips =
        data##getRoute##trips
        ->Belt.Array.map(trip => trip)
        ->GeoJsonLayer.make(~data=_, ());
      [|trips|];
    | NoData
    | Loading
    | Error(_) => [||]
    };

  <DeckGL
    controller=true
    onViewStateChange={vp => dispatch(UpdateViewState(vp##viewState))}
    viewState=state
    layers>
    <StaticMap
      mapStyle="mapbox://styles/mapbox/light-v10"
      reuseMaps=true
      preventStyleDiffing=true
      mapboxApiAccessToken=Config.mapboxToken>
      <MarkerLayer departingPosition currentDestination currentPosition />
    </StaticMap>
  </DeckGL>;
};
