open ReactMapGl;

type event =
  | UpdateViewState(Client.ReactMapGl.DeckGL.viewState);

let initialState =
  DeckGL.viewState(~longitude=19.837932, ~latitude=66.605854, ~zoom=7, ());

[@react.component]
let make = (~initialViewState=initialState) => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | UpdateViewState(viewState) => viewState
        },
      initialState,
    );

  
    <DeckGL
      controller=true
      onViewStateChange={vp => dispatch(UpdateViewState(vp##viewState))}
      viewState=state
      layers=[||]>
      <StaticMap
        reuseMaps=true
        preventStyleDiffing=true
        mapboxApiAccessToken=Config.mapboxToken>
        React.null
      </StaticMap>
    </DeckGL>

};
