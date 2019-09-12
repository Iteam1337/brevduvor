type appState = {
  currentPosition: option(GeoLocation.Navigator.coordinates),
  availableDestinations: list(Shared.Destination.t),
  currentDestination: option(Shared.Destination.t),
};

type appActions =
  | SetCurrentPosition(GeoLocation.Navigator.coordinates)
  | AvailableDestinations(list(Shared.Destination.t))
  | ChangeDestination(Shared.Destination.t)
  | SaveDestination(Shared.Destination.t);

let initialState = {
  currentPosition: None,
  availableDestinations: [],
  currentDestination: None,
};

[@react.component]
let make = () => {
  let ({currentDestination, currentPosition, _}, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | SetCurrentPosition(coordinates) => {
            ...state,
            currentPosition: Some(coordinates),
          }
        | AvailableDestinations(availableDestinations) => {
            ...state,
            availableDestinations,
          }
        | ChangeDestination(dest) => {
            ...state,
            currentDestination: Some(dest),
          }
        | SaveDestination(dest) => {
            ...state,
            currentDestination: Some(dest),
          }
        },
      initialState,
    );

  GeoLocation.Navigator.getCurrentPosition(coords =>
    dispatch(SetCurrentPosition(coords))
  );

  let handleDestinationSelect = destination => {
    dispatch(ChangeDestination(destination));
  };

  <div className="flex">
    <div className="py-6 px-4 bg-gray-800 min-h-screen">
      <div className="w-full flex flex-col justify-center">
        <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
      </div>
    </div>
    <div className="w-2/12 min-h-screen flex">
      <div className="w-full p-4 bg-white h-full flex flex-col">
        <Destination handleDestinationSelect />
        <Button.Primary className="mt-auto">
          "Starta"->React.string
        </Button.Primary>
      </div>
    </div>
    <div className="w-10/12 bg-gray-400 h-12 relative min-h-screen">
      {switch (currentDestination) {
       | Some({lat, lon}) =>
         <Map
           flyTo={ReactMapGl.DeckGL.viewState(
             ~longitude=lon,
             ~latitude=lat,
             ~zoom=10,
             ~transitionDuration=2000,
             ~transitionInterpolator=ReactMapGl.Interpolator.FlyTo.make(),
             (),
           )}>
           <Marker.Marker latitude=lat longitude=lon />
         </Map>
       | None =>
         switch (currentPosition) {
         | Some({latitude: lat, longitude: lon}) =>
           <Map
             flyTo={ReactMapGl.DeckGL.viewState(
               ~longitude=lon,
               ~latitude=lat,
               ~zoom=10,
               (),
             )}
             initialViewState={ReactMapGl.DeckGL.viewState(
               ~longitude=lon,
               ~latitude=lat,
               ~zoom=10,
               (),
             )}>
             <Marker.Marker latitude=lat longitude=lon />
           </Map>
         | None => React.null
         }
       }}
    </div>
  </div>;
};