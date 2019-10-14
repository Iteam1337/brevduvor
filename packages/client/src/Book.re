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

  let (availablePositionsResponse, _) = AllDestinationsQuery.use();

  let {departingPosition, destination} = state;

  <div className="w-3/12 min-h-screen flex">
    <div className="w-full p-4 bg-white h-full flex flex-col">
      {switch (availablePositionsResponse) {
       | Data(data) =>
         let selectOptions =
           data##allDestinations
           ->Belt.Array.map(Shared.GeoPosition.toRecord)
           ->Belt.List.fromArray;

         <>
           <label> {js|Från:|js}->React.string </label>
           <GeoSelectBox
             name="select-from"
             onChange=handleDepartingPositionSelect
             selectOptions
           />
           <label> "Till:"->React.string </label>
           <GeoSelectBox
             name="select-to"
             onChange=handleDestinationSelect
             selectOptions
           />
         </>;
       | Loading
       | NoData
       | Error(_) =>
         <p>
           {js|Kunde inte hämta tillgängliga destinationer|js}->React.string
         </p>
       }}
      {switch (departingPosition, destination) {
       | (Some(start), Some(stop)) => <InitDrone start stop />
       | _ => React.null
       }}
    </div>
  </div>;
};