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
      <div className="w-16 py-6 px-3 h-full">
        <div className="w-full flex flex-col justify-center">
          <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
        </div>
      </div>
      <div className="w-full p-4 bg-white h-full flex flex-col">
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
        <Button.Primary className="mt-auto">
          "Spara destination"->React.string
        </Button.Primary>
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