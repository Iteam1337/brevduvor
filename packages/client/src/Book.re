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

  let handleDroneStartResponse = id => SetDroneId(id)->dispatch;

  let (availablePositionsResponse, _) = AllDestinationsQuery.use();

  let {departingPosition, destination, droneId} = state;
  I18n.Translations.(
    <div className="w-full min-h-screen flex">
      <SideMenu>
        {switch (availablePositionsResponse) {
         | Data(data) =>
           let selectOptions =
             data##allDestinations
             ->Belt.Array.map(Shared.GeoPosition.toRecord)
             ->Belt.List.fromArray;
           <>
             <Input.GeoSelect
               label={BookTrip_From_DropdownLabel->toString}
               name="select-from"
               onChange=handleDepartingPositionSelect
               selectOptions
             />
             <Input.GeoSelect
               label={BookTrip_To_DropdownLabel->toString}
               name="select-to"
               onChange=handleDestinationSelect
               selectOptions
             />
           </>;
         | Loading => <Loader.Inline isLoading=true />
         | NoData
         | Error(_) =>
           <p>
             {{I18n.Error.toString(CouldNotGetAvailableDestinations)}
              ->React.string}
           </p>
         }}
        {switch (departingPosition, destination, droneId) {
         | (Some(start), Some(stop), None) =>
           <InitDrone start stop handleDroneStartResponse />
         | (Some(_), Some(_), Some(_)) => React.null
         | _ =>
           <Button.Secondary disabled=true className="mt-5">
             {BookTrip_PrepareTrip_Button->toString->React.string}
           </Button.Secondary>
         }}
        {switch (droneId) {
         | Some(id) =>
           <>
             <p className="mt-5">
               {{I18n.Translations.toString(BookTrip_Booking_Finished)}
                ->React.string}
             </p>
             <Button.Primary
               className="mt-5"
               onClick={_ => ReasonReactRouter.push("/resa/" ++ id)}>
               {BookTrip_GoToOverview_Button->toString->React.string}
             </Button.Primary>
           </>
         | _ => React.null
         }}
      </SideMenu>
    </div>
  );
};