let initialState: UseAppReducer.appState = {
  currentPosition: None,
  currentDestination: None,
  droneStatus: None,
  availableDestinations: [],
  currentRoute: None,
  droneId: None,
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
  let (
    {currentDestination, currentPosition, droneId, _}: UseAppReducer.appState,
    dispatch,
  ) =
    UseAppReducer.make(~initialState);

  let handleDestinationSelect = destination =>
    dispatch(ChangeDestination(destination));

  let handlePositionSelect = station =>
    dispatch(SetCurrentPosition(station));

  let handleDroneInitResponse = data =>
    switch (data) {
    | Belt.Result.Ok(droneId) => dispatch(DroneId(droneId))
    | Belt.Result.Error(e) => Js.log2("InitDroneError", e)
    };

  let _handleDroneStatusSubscriptionData = data => {
    Js.log2("handleDroneData: ", data);
    dispatch(UpdateDrone(data));
    None;
  };

  let dronePos:
    ReasonApolloHooks.Subscription.variant(
      UseDronePosition.DronePositionSubscriptionConfig.t,
    ) =
    UseDronePosition.use(~id=?droneId, ());

  React.useEffect1(
    () => {
      switch (dronePos) {
      | Data(data) =>
        switch (data##dronePosition) {
        | Some(d) => UpdateDrone(d->Shared.Drone.make)->dispatch
        | _ => ()
        }

      | NoData
      | Loading
      | Error(_) => ()
      };

      None;
    },
    [|dronePos|],
  );

  <div className="flex">
    <div className="py-6 px-4 bg-blue-400 min-h-screen">
      <div className="w-full flex flex-col justify-center">
        <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
      </div>
    </div>
    <div className="w-3/12 min-h-screen flex">
      <div className="w-full p-4 bg-white h-full flex flex-col">
        <label> {js|Från:|js}->React.string </label>
        <GeoSelectBox selectOptions=stations onChange=handlePositionSelect />
        <label> "Till:"->React.string </label>
        <Destination handleDestinationSelect />
        {switch (currentPosition, currentDestination) {
         | (Some(start), Some(stop)) =>
           <InitDrone start stop handleDroneInitResponse />
         | _ => React.null
         }}
      </div>
    </div>
    <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
      <Map ?currentPosition ?currentDestination> <div /> </Map>
    </div>
  </div>;
};