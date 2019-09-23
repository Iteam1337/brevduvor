open ReactMapGl;

type event =
  | UpdateViewState(Client.ReactMapGl.DeckGL.viewState)
  | ShouldSkipRouteQuery(bool);

type state = {
  viewState: DeckGL.viewState,
  shouldSkipRouteQuery: bool,
};

let initialState = {
  viewState:
    DeckGL.viewState(~longitude=19.837932, ~latitude=66.605854, ~zoom=10, ()),
  shouldSkipRouteQuery: true,
};

module GetRoute = [%graphql
  {|
  query GetRoute($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      trips {
        geoJson {
          coordinates
          _type: type
        }

      }
    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRoute);

[@react.component]
let make =
    (
      ~initialViewState=?,
      ~children as _c=?,
      ~currentPosition=?,
      ~currentDestination=?,
    ) => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | UpdateViewState(viewState) => {...state, viewState}
        | ShouldSkipRouteQuery(value) => {
            ...state,
            shouldSkipRouteQuery: value,
          }
        },
      {
        ...initialState,
        viewState:
          initialViewState->Belt.Option.getWithDefault(
            initialState.viewState,
          ),
      },
    );

  let (simple, _full) =
    Belt.Option.(
      GetRouteQuery.use(
        ~skip=state.shouldSkipRouteQuery,
        ~variables=
          GetRoute.make(
            ~start=
              Shared.GeoPosition.tToJs(
                currentPosition->getWithDefault(Shared.GeoPosition.empty),
              ),
            ~stop=
              Shared.GeoPosition.tToJs(
                currentDestination->getWithDefault(Shared.GeoPosition.empty),
              ),
            (),
          )##variables,
        (),
      )
    );

  let handleFlyTo = (~zoom=12, ~lat, ~lon, ()) =>
    dispatch(
      UpdateViewState(
        ReactMapGl.DeckGL.viewState(
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

  React.useEffect1(
    () => {
      switch (currentPosition, currentDestination) {
      | (Some({Shared.GeoPosition.lon, lat}), None) =>
        handleFlyTo(~lat, ~lon, ())
      | (None, Some({Shared.GeoPosition.lon, lat})) =>
        handleFlyTo(~lat, ~lon, ())
      | (Some(pos), Some(dest)) =>
        flyToRoute([|pos.lon, pos.lat|], [|dest.lon, dest.lat|]);
        dispatch(ShouldSkipRouteQuery(false));
      | _ => ()
      };

      None;
    },
    [|currentPosition, currentDestination|],
  );

  let layers =
    switch (simple) {
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
    viewState={state.viewState}
    layers>
    <StaticMap
      mapStyle="mapbox://styles/mapbox/light-v10"
      reuseMaps=true
      preventStyleDiffing=true
      mapboxApiAccessToken=Config.mapboxToken>
      <MarkerLayer currentPosition currentDestination />
    </StaticMap>
  </DeckGL>;
};