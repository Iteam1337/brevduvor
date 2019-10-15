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

  <div className="flex">
    {switch (response) {
     | Data(data) =>
       data##droneStatus
       ->Belt.Option.map(Shared.Drone.make)
       ->Belt.Option.map(drone =>
           <>
             <div className="py-6 px-4 bg-blue-400 min-h-screen z-20">
               <div className="w-full flex flex-col justify-center">
                 <Icon
                   name=`Dashboard
                   className="text-gray-100 w-6 h-6 mb-6"
                 />
               </div>
             </div>
             <div className="w-3/12 min-h-screen flex">
               <div
                 className="w-full p-4 bg-white shadow-lg z-10 h-full flex flex-col">
                 <DroneStatus drone />
               </div>
             </div>
             <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
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
     | Loading => <p> {js|Laddar drönares position|js}->React.string </p>
     | NoData => <p> {I18n.Error.toString(NoDroneWithId)->React.string} </p>
     | Error(_) =>
       <p> {I18n.Error.toString(NoDroneWithIdError)->React.string} </p>
     }}
  </div>;
};
