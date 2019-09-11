type appState = {
  availableDestinations: list(Destination.t),
  currentDestination: Destination.t,
};

type appActions =
  | AvailableDestinations(list(Destination.t))
  | ChangeDestination(Destination.t)
  | SaveDestination(Destination.t);

let initialState = {
  availableDestinations: [],
  currentDestination: Destination.storuman,
};

[@react.component]
let make = () => {
  let ({currentDestination, availableDestinations}, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | AvailableDestinations(availableDestinations) => {
            ...state,
            availableDestinations,
          }
        | ChangeDestination(dest) => {...state, currentDestination: dest}
        | SaveDestination(dest) => {...state, currentDestination: dest}
        },
      initialState,
    );

  React.useEffect0(() => {
    /* Fetch for available destinations */
    dispatch(
      AvailableDestinations([
        Destination.storuman,
        Destination.kvikkjokk,
        Destination.slussfors,
      ]),
    );

    None;
  });

  Js.log2("CurrentDestination", currentDestination->Destination.t_encode);

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
          selectOptions=availableDestinations
        />
        <Button.Primary className="mt-auto">
          "Starta"->React.string
        </Button.Primary>
      </div>
    </div>
    <div className="w-10/12 bg-gray-400 h-12 relative min-h-screen">
      <Map
        flyTo={ReactMapGl.DeckGL.viewState(
          ~longitude=currentDestination.lon,
          ~latitude=currentDestination.lat,
          ~zoom=12,
          ~transitionDuration=2000,
          ~transitionInterpolator=ReactMapGl.Interpolator.FlyTo.make(),
          (),
        )}>
        <Marker.Marker
          latitude={currentDestination.lat}
          longitude={currentDestination.lon}
        />
      </Map>
    </div>
  </div>;
};
