type appState = {
  currentPosition: option(Shared.GeoPosition.t),
  currentDestination: option(Shared.GeoPosition.t),
  droneStatus: option(Shared.Drone.t),
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
  | UpdateDrone(Shared.Drone.t)
  | DroneId(string);

let use = (~initialState) => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | SetCurrentPosition(station) => {
            ...state,
            currentPosition: Some(station),
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
        | UpdateDrone(droneData) => {...state, droneStatus: Some(droneData)}
        },
      initialState,
    );
  ();

  (state, dispatch);
};