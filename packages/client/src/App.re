type appState = {
  currentPosition: option(Shared.GeoPosition.t),
  availableDestinations: list(Shared.GeoPosition.t),
  currentDestination: option(Shared.GeoPosition.t),
  currentRoute: option(array(ReactMapGl.Waypoints.t)),
};

type appActions =
  | SetCurrentPosition(Shared.GeoPosition.t)
  | AvailableDestinations(list(Shared.GeoPosition.t))
  | ChangeDestination(Shared.GeoPosition.t)
  | SaveDestination(Shared.GeoPosition.t)
  | SetCurrentRoute(array(ReactMapGl.Waypoints.t));

let initialState = {
  currentPosition: None,
  availableDestinations: [],
  currentDestination: None,
  currentRoute: None,
};

let storuman: Shared.GeoPosition.t = {
  alias: "Storuman",
  lat: 65.090833,
  lon: 17.1075,
};
let slussfors: Shared.GeoPosition.t = {
  alias: "Slussfors",
  lat: 65.4308046,
  lon: 16.2481741,
};

let stations = [storuman, slussfors];

[@react.component]
let make = () => {
  let ({currentDestination, currentPosition, _}, dispatch) =
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
        },
      initialState,
    );

  let handleDestinationSelect = destination =>
    dispatch(ChangeDestination(destination));

  let handleStationSelect = station => dispatch(SetCurrentPosition(station));

  /* let handleGetRouteClick = data => {
       Js.log(data);
       ();
     }; */

  let handleRouteData = data => {
    data->Js.log;
    "In route data handler"->Js.log;
    dispatch(SetCurrentRoute(data));
  };

  <div className="flex">
    /* // Dont know how to do this better at time of writing

       {switch (currentPosition) {
        | Some(cp) =>
          switch (currentDestination) {
          | Some(cd) =>
            let p: Js.t('a) = {
              "alias": cp.alias,
              "lat": cp.lat,
              "lon": cp.lon,
            };
            let d: Js.t('b) = {
              "alias": cd.alias,
              "lat": cd.lat,
              "lon": cd.lon,
            };
            <Route position=p destination=d callback=handleGetRouteClick />;
          | _ => React.null
          }
        | None => React.null
        }} */

      <div className="py-6 px-4 bg-blue-400 min-h-screen">
        <div className="w-full flex flex-col justify-center">
          <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
        </div>
      </div>
      <div className="w-3/12 min-h-screen flex">
        <div className="w-full p-4 bg-white h-full flex flex-col">
          <label> {js|Från:|js}->React.string </label>
          <GeoSelectBox selectOptions=stations onChange=handleStationSelect />
          <label> "Till:"->React.string </label>
          <Destination handleDestinationSelect />
          <GetRoute
            start={Some(storuman)}
            stop={Some(slussfors)}
            onData=handleRouteData
          />
          <Button.Primary className="mt-auto">
            "Starta"->React.string
          </Button.Primary>
        </div>
      </div>
      <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
        {
          switch (currentDestination) {
          | Some({lat, lon}) =>
            <Map
              flyTo={
                ReactMapGl.DeckGL.viewState(
                  ~longitude=lon,
                  ~latitude=lat,
                  ~zoom=10,
                  ~transitionDuration=2000,
                  ~transitionInterpolator=ReactMapGl.Interpolator.FlyTo.make(),
                  (),
                )
              }>
              {
                switch (currentPosition) {
                | Some({lat, lon}) =>
                  <Marker.Position latitude=lat longitude=lon />
                | None => React.null
                }
              }
              <Marker.Destination latitude=lat longitude=lon />
            </Map>
          | None =>
            switch (currentPosition) {
            | Some({lat, lon}) =>
              <Map
                flyTo={
                  ReactMapGl.DeckGL.viewState(
                    ~longitude=lon,
                    ~latitude=lat,
                    ~zoom=12,
                    (),
                  )
                }
                initialViewState={
                  ReactMapGl.DeckGL.viewState(
                    ~longitude=lon,
                    ~latitude=lat,
                    ~zoom=12,
                    (),
                  )
                }>
                <Marker.Position latitude=lat longitude=lon />
              </Map>
            | None => React.null
            }
          }
        }
      </div>
    </div>;
};