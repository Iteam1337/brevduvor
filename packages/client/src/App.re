type appState = {currentDestination: Destination.t};

type appActions =
  | ChangeDestination(Destination.t)
  | SaveDestination(Destination.t);

let initialState = {currentDestination: Destination.storuman};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | ChangeDestination(dest) => {currentDestination: dest}
        | SaveDestination(dest) => {currentDestination: dest}
        },
      initialState,
    );

  Js.log(state);

  <div className="flex">
    <div className="py-6 px-4 bg-gray-800 min-h-screen">
      <div className="w-full flex flex-col justify-center">
        <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
      </div>
    </div>
    <div className="w-2/12 min-h-screen flex">
      <div className="w-full p-4 bg-white h-full flex flex-col">
        <SelectDestination
          handleDestinationChange={selectedDestination =>
            dispatch(ChangeDestination(selectedDestination))
          }
          selectOptions=[
            Destination.storuman,
            Destination.kvikkjokk,
            Destination.slussfors,
          ]
        />
        <Button.Primary className="mt-auto">
          "Starta"->React.string
        </Button.Primary>
      </div>
    </div>
    <div className="w-10/12 bg-gray-400 h-12 relative min-h-screen">
      <Map
        flyTo={ReactMapGl.DeckGL.viewState(
          ~longitude=state.currentDestination.lon,
          ~latitude=state.currentDestination.lat,
          ~zoom=12,
          ~transitionDuration=2000,
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