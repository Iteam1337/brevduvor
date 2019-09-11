open ReactMapGl;

type event =
  | UpdateViewState(Client.ReactMapGl.DeckGL.viewState);

let initialState =
  DeckGL.viewState(~longitude=19.837932, ~latitude=66.605854, ~zoom=10, ());

[@react.component]
let make = (~initialViewState=initialState, ~children, ~flyTo) => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | UpdateViewState(viewState) => viewState
        },
      initialState,
    );

  React.useEffect1(
    () => {
      dispatch(UpdateViewState(flyTo));
      None;
    },
    [|flyTo|],
  );

  <DeckGL
    controller=true
    onViewStateChange={vp => dispatch(UpdateViewState(vp##viewState))}
    viewState=state
    layers=[||]>
    <StaticMap
      mapStyle="mapbox://styles/mapbox/navigation-guidance-night-v4"
      reuseMaps=true
      preventStyleDiffing=true
      mapboxApiAccessToken=Config.mapboxToken>
      children
    </StaticMap>
  </DeckGL>;
};