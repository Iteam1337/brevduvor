type appState = {currentDestination: Destination.t};

type appActions =
  | ChangeDestination(Destination.t);

let initialState = {currentDestination: Destination.storuman};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | ChangeDestination(dest) => {currentDestination: dest}
        },
      initialState,
    );

  Js.log(state);

  <div className="flex">
    <div className="w-1/4 bg-blue-400 min-h-screen flex">
      <div className="w-16 h-full"> "Yo"->React.string </div>
      <div className="w-full bg-white h-full">
        <Select
          handleDestinationChange={selectedDestination =>
            dispatch(ChangeDestination(selectedDestination))
          }
          selectOptions=[
            Destination.storuman,
            Destination.kvikkjokk,
            Destination.slussfors,
          ]
        />
      </div>
    </div>
    <div className="w-3/4 bg-gray-400 h-12 relative min-h-screen">
      <Map
        flyTo={ReactMapGl.DeckGL.viewState(
          ~longitude=state.currentDestination.lon,
          ~latitude=state.currentDestination.lat,
          ~zoom=7,
          ~transitionDuration=1000,
          ~transitionInterpolator=ReactMapGl.Interpolator.FlyTo.make(),
          (),
        )}>
        <Marker.Marker
          latitude={state.currentDestination.lat}
          longitude={state.currentDestination.lon}
        />
      </Map>
    </div>
  </div>;
};