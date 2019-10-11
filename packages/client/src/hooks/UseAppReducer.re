type appState = {
  departingPosition: option(Shared.GeoPosition.t),
  currentDestination: option(Shared.GeoPosition.t),
  availableDestinations: list(Shared.GeoPosition.t),
  currentRoute: option(ReactMapGl.Waypoints.t),
  droneId: option(string),
};

type appActions =
  | SetCurrentPosition(Shared.GeoPosition.t)
  | AvailableDestinations(list(Shared.GeoPosition.t))
  | ChangeDestination(Shared.GeoPosition.t)
  | SaveDestination(Shared.GeoPosition.t)
  | SetCurrentRoute(ReactMapGl.Waypoints.t)
  | DroneId(string);

let use = (~initialState) => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | SetCurrentPosition(station) => {
            ...state,
            departingPosition: Some(station),
          }
        | AvailableDestinations(availableDestinations) => {
            ...state,
            availableDestinations,
          }
        | ChangeDestination(dest) => {
            ...state,
            currentDestination: Some(dest),
          }
        | SetCurrentRoute(route) => {...state, currentRoute: Some(route)}
        | SaveDestination(dest) => {
            ...state,
            currentDestination: Some(dest),
          }
        | DroneId(droneId) => {...state, droneId: Some(droneId)}
        },
      initialState,
    );
  ();

  (state, dispatch);
};
