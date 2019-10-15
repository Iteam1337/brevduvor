module DroneStatusSubscriptionConfig = [%graphql
  {|
  subscription DroneStatusSubscription($id: String!) {
    droneStatus(id: $id) {
      id
      status
      batteryStatus
      start {
        alias
        lat
        lon
      }
      stop {
        alias
        lat
        lon
      }
      currentPos {
        lat
        lon
      }
    }
  }
|}
];

module DroneStatusSubscription =
  ReasonApolloHooks.Subscription.Make(DroneStatusSubscriptionConfig);

[@react.component]
let make = (~id) => {
  let (response, _full) =
    DroneStatusSubscription.use(
      ~variables=DroneStatusSubscriptionConfig.make(~id, ())##variables,
      (),
    );

  <div className="w-full min-h-screen flex">
    {switch (response) {
     | Data(data) =>
       data##droneStatus
       ->Belt.Option.map(Shared.Drone.make)
       ->Belt.Option.map(drone =>
           <>
             <SideMenu> <DroneStatus drone /> </SideMenu>
             <div className="w-full relative min-h-screen">
               <Map
                 departingPosition={drone.start}
                 currentDestination={drone.stop}
                 currentPosition={drone.currentPos}
               />
             </div>
           </>
         )
       ->Belt.Option.getWithDefault(
           {js|Det verkar som att någonting gick fel. Ingen drönardata
       kunde hämtas|js}
           ->React.string,
         )
     | Loading =>
       <SideMenu>
         <p> {js|Laddar drönares position|js}->React.string </p>
       </SideMenu>
     | NoData => <p> {I18n.Error.toString(NoDroneWithId)->React.string} </p>
     | Error(_) =>
       <p> {I18n.Error.toString(NoDroneWithIdError)->React.string} </p>
     }}
  </div>;
};