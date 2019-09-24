let initialState: UseAppReducer.appState = {
  currentPosition: None,
  currentDestination: None,
  currentDroneStatus: None,
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
    {currentDestination, currentPosition, droneId, currentDroneStatus, _}: UseAppReducer.appState,
    dispatch,
  ) =
    UseAppReducer.make(~initialState);

  let handleDestinationSelect = destination =>
    dispatch(ChangeDestination(destination));

  let handlePositionSelect = station =>
    dispatch(SetCurrentPosition(station));

  let handleDroneInitResponse = data =>
    switch (data) {
    | Belt.Result.Ok(droneId) =>
      switch (droneId) {
      | Some(id) => dispatch(DroneId(id))
      | _ => ()
      }
    | Belt.Result.Error(e) => Js.log2("InitDroneError", e)
    };

  let handleDroneStatusSubscriptionData = (data: Shared.GeoPosition.t) => {
    Js.log2("handleDroneData: ", data);
    dispatch(UpdateDrone(data));
  };

  Js.log2("current Drone Status: ", currentDroneStatus);

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
        {switch (droneId) {
         | Some(id) => <DronePosition id handleDroneStatusSubscriptionData />
         | _ => React.null
         }}
      </div>
    </div>
    <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
      <Map ?currentPosition ?currentDestination> <div /> </Map>
    </div>
  </div>;
};