type state = {
  departingPosition: option(Shared.GeoPosition.t),
  destination: option(Shared.GeoPosition.t),
  droneId: option(string),
};

type actions =
  | SetDepartingPosition(Shared.GeoPosition.t)
  | SetDestination(Shared.GeoPosition.t)
  | SetDroneId(string);

let initialState = {
  departingPosition: None,
  destination: None,
  droneId: None,
};

let toRecord = destination => {
  Shared.GeoPosition.alias: destination##alias,
  lat: destination##lat,
  lon: destination##lon,
};

module AllDestinations = [%graphql
  {|
  query AllDestinations {
    allDestinations {
      alias
      lat
      lon
    }
  }
|}
];

module AllDestinationsQuery = ReasonApolloHooks.Query.Make(AllDestinations);

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | SetDepartingPosition(station) => {
            ...state,
            departingPosition: Some(station),
          }
        | SetDestination(station) => {...state, destination: Some(station)}
        | SetDroneId(droneId) => {...state, droneId: Some(droneId)}
        },
      initialState,
    );

  let handleDestinationSelect = destination =>
    SetDestination(destination)->dispatch;

  let handleDepartingPositionSelect = pos =>
    SetDepartingPosition(pos)->dispatch;

  let handleDroneInitResponse = data => {
    switch (data) {
    | Belt.Result.Ok(droneId) => dispatch(SetDroneId(droneId))
    | Belt.Result.Error(e) => Js.log2("InitDroneError", e)
    };
  };

  let (availablePositionsResponse, _) = AllDestinationsQuery.use();

  let {departingPosition, destination, droneId} = state;

  <div className="w-3/12 min-h-screen flex">
    <div className="w-full p-4 bg-white h-full flex flex-col">
      {switch (availablePositionsResponse) {
       | Data(data) =>
         let selectOptions =
           data##allDestinations
           ->Belt.Array.map(toRecord)
           ->Belt.List.fromArray;
         <React.Fragment>
           <label> {js|Från:|js}->React.string </label>
           <GeoSelectBox
             onChange=handleDepartingPositionSelect
             selectOptions
           />
           <label> "Till:"->React.string </label>
           <GeoSelectBox onChange=handleDestinationSelect selectOptions />
         </React.Fragment>;
       | Loading
       | NoData
       | Error(_) =>
         <p>
           {js|Kunde inte hämta tillgängliga destinationer|js}->React.string
         </p>
       }}
      {switch (departingPosition, destination) {
       | (Some(start), Some(stop)) =>
         <InitDrone start stop handleDroneInitResponse />
       | _ => React.null
       }}
      {switch (droneId) {
       | Some(id) =>
         <Button.Primary
           onClick={_ => ReasonReactRouter.push("/leverans/" ++ id)}
           className="mt-4 bg-green-400">
           {React.string({js| Gå till bokning |js})}
         </Button.Primary>
       | _ => React.null
       }}
    </div>
  </div>;
};