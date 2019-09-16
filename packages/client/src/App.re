type appState = {
  currentPosition: option(Shared.GeoPosition.t),
  availableDestinations: list(Shared.GeoPosition.t),
  currentDestination: option(Shared.GeoPosition.t),
};

type appActions =
  | SetCurrentPosition(Shared.GeoPosition.t)
  | AvailableDestinations(list(Shared.GeoPosition.t))
  | ChangeDestination(Shared.GeoPosition.t)
  | SaveDestination(Shared.GeoPosition.t);

let initialState = {
  currentPosition: None,
  availableDestinations: [],
  currentDestination: None,
};

let storuman: Shared.GeoPosition.t = {
  alias: "Storuman",
  lat: 18.123,
  lon: 59.123,
};
let hagalund: Shared.GeoPosition.t = {
  alias: "Hagalund",
  lat: 59.358956,
  lon: 17.9884899,
};

let stations = [storuman, hagalund];

module GetRouteConfig = [%graphql
  {|
  query GetRouteQuery($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      geoJson {
        type
        coordinates
      }
      distance

    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRouteConfig);

let start = {"alias": "Storuman", "lat": 65.090833, "lon": 17.1075};
let stop = {"alias": "Slussfors", "lat": 65.4308046, "lon": 16.2481741};

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
        | SaveDestination(dest) => {
            ...state,
            currentDestination: Some(dest),
          }
        },
      initialState,
    );
  let getRouteParams = GetRouteConfig.make(~start, ~stop, ());

  let (_simple, _full) =
    GetRouteQuery.use(
      ~variables=getRouteParams##variables,
      ~notifyOnNetworkStatusChange=true,
      ~skip=
        switch (currentDestination) {
        | None => true
        | _ => false
        },
      (),
    );

  let (simple, _full) =
    UserQuery.use(
      ~skip=
        switch (currentDestination) {
        | None => true
        | _ => false
        },
      (),
    );

  let handleDestinationSelect = destination => {
    dispatch(ChangeDestination(destination));
  };

  let handleStationSelect = station => {
    dispatch(SetCurrentPosition(station));
  };

  let handleGetRouteClick = _ => {
    ();
  };

  <div className="flex">
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
        <Button.Primary className="mt-5" onClick=handleGetRouteClick>
          "Hämta rutt"->React.string
        </Button.Primary>
        <Button.Primary className="mt-auto">
          "Starta"->React.string
        </Button.Primary>
      </div>
    </div>
    <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
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
           {switch (currentPosition) {
            | Some({lat, lon}) =>
              <Marker.Position latitude=lat longitude=lon />
            | None => React.null
            }}
           <Marker.Destination latitude=lat longitude=lon />
         </Map>
       | None =>
         switch (currentPosition) {
         | Some({lat, lon}) =>
           <Map
             flyTo={ReactMapGl.DeckGL.viewState(
               ~longitude=lon,
               ~latitude=lat,
               ~zoom=12,
               (),
             )}
             initialViewState={ReactMapGl.DeckGL.viewState(
               ~longitude=lon,
               ~latitude=lat,
               ~zoom=12,
               (),
             )}>
             <Marker.Position latitude=lat longitude=lon />
           </Map>
         | None => React.null
         }
       }}
    </div>
  </div>;
};