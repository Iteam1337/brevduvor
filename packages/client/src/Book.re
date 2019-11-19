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
  let ({translationsToString, _}, _changeLocale): LocaleContext.t =
    LocaleContext.use();

  let (availablePositionsResponse, _) = AllDestinationsQuery.use();

  let dispatchNotification =
    Notifications.Dispatch.make(React.useContext(Notifications.Context.t));

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

  let handleDroneInitResponse = id => SetDroneId(id)->dispatch;

  let {departingPosition, destination, droneId} = state;

  NotificationHook.use(
    () => {
      switch (availablePositionsResponse) {
      | Error(_e) =>
        dispatchNotification(Error(CouldNotGetAvailableDestinations))
      | Data(_)
      | Loading
      | NoData => ()
      };
      None;
    },
    [|availablePositionsResponse|],
  );

  NotificationHook.use(
    () => {
      switch (droneId) {
      | Some(_) => dispatchNotification(Success(BookTrip_Booking_Finished))
      | None => ()
      };
      None;
    },
    [|droneId|],
  );

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
               label=BookTrip_From_Label
               name="select-from"
               onChange=handleDepartingPositionSelect
               selectOptions
             />
             <Input.GeoSelect
               label=BookTrip_To_Label
               name="select-to"
               onChange=handleDestinationSelect
               selectOptions
             />
           </>;
         | Loading => <Loader.Inline isLoading=true />
         | NoData
         | Error(_) => React.null
         }}
        {switch (departingPosition, destination, droneId) {
         | (Some(start), Some(stop), None) =>
           <InitDrone start stop handleDroneInitResponse />
         | (Some(_), Some(_), Some(_)) => React.null
         | _ =>
           <Button.Secondary disabled=true className="mt-5">
             {translationsToString(BookTrip_PrepareTrip_Button)->React.string}
           </Button.Secondary>
         }}
        {switch (droneId) {
         | Some(id) =>
           <Button.Primary
             className="mt-5"
             onClick={_ => ReasonReactRouter.push("/resa/" ++ id)}>
             BookTrip_GoToOverview_Button
           </Button.Primary>
         | _ => React.null
         }}
      </SideMenu>
    </div>
  );
};