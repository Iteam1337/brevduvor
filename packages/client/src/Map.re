open ReactMapGl;

type event =
  | UpdateViewState(Client.ReactMapGl.DeckGL.viewState)
  | ShouldQueryRoute(bool);

type state = {
  viewState: DeckGL.viewState,
  shouldQueryRoute: bool
};

let initialState = {
  viewState: DeckGL.viewState(~longitude=19.837932, ~latitude=66.605854, ~zoom=10, ()),
  shouldQueryRoute: false
};

module GetRoute = [%graphql
  {|
  query GetRoute($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      trips {
        geoJson {
          coordinates
        }
      }
    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRoute);

[@react.component]
let make = (~initialViewState=?, ~children=?, ~currentPosition=?, ~currentDestination=?) => {

// Js.log(currentDestination);
// Js.log(currentPosition);

  // let (skip, setSkip) = React.useState(() => true);

      // let (simple, _full) =
      //   GetRouteQuery.use(
      //     ~skip,
      //     ~variables=
      //       GetRoute.make(
      //         ~start=Shared.GeoPosition.tToJs(start),
      //         ~stop=Shared.GeoPosition.tToJs(stop),
      //         (),
      //       )##variables,
      //     (),
      //   );

  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | UpdateViewState(viewState) => {...state, viewState: viewState}
        | ShouldQueryRoute(value) => {...state, shouldQueryRoute: value}
        },
      {...initialState, viewState: initialViewState -> Belt.Option.getWithDefault(initialState.viewState) },
    );

  let handleFlyTo = (~lat, ~lon) => dispatch(UpdateViewState(ReactMapGl.DeckGL.viewState(~longitude=lon, ~latitude=lat, ~zoom=12, ())));


  React.useEffect1(
    () => {
      switch (currentPosition, currentDestination) {
      | (Some({ Shared.GeoPosition.lon, lat }), None) => handleFlyTo(~lat, ~lon)
      | (None, Some({ Shared.GeoPosition.lon, lat })) => handleFlyTo(~lat, ~lon)
      | (Some(_), Some(_)) => dispatch(ShouldQueryRoute(true))
      | _ => ()
      };
      
      None;
    },
    [|currentPosition, currentDestination|]
  );

  <DeckGL
    controller=true
    onViewStateChange={vp => dispatch(UpdateViewState(vp##viewState))}
    viewState=state.viewState
    layers=[||]>
    <StaticMap
      mapStyle="mapbox://styles/mapbox/light-v10"
      reuseMaps=true
      preventStyleDiffing=true
      mapboxApiAccessToken=Config.mapboxToken>
      <Marker.Position latitude=lat longitude=lon />
    </StaticMap>
  </DeckGL>;
};