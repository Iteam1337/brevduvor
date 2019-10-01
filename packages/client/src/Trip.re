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
  let (simple, _full) =
    DroneStatusSubscription.use(
      ~variables=DroneStatusSubscriptionConfig.make(~id, ())##variables,
      (),
    );

  <div className="flex">
    {switch (simple) {
     | Data(data) =>
       let drone = data##droneStatus->Shared.Drone.make;
       <React.Fragment>
         <div className="py-6 px-4 bg-blue-400 min-h-screen z-20">
           <div className="w-full flex flex-col justify-center">
             <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
           </div>
         </div>
         <div className="w-3/12 min-h-screen flex">
           <div
             className="w-full p-4 bg-white shadow-lg z-10 h-full flex flex-col">
             <DroneStatus data=drone />
           </div>
         </div>
         <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
           <Map
             departingPosition={drone.start}
             currentDestination={drone.stop}
             currentPosition={drone.currentPos}
           />
         </div>
       </React.Fragment>;

     | Loading => <p> {j|Laddar drönares position|j}->React.string </p>
     | NoData =>
       <p>
         {j|Det verkar inte finnas någon drönare med detta id.|j}
         ->React.string
       </p>
     | Error(_) =>
       <p>
         {j|Någonting verkar ha gått fel. Kanske finns det ingen drönare med detta id.|j}
         ->React.string
       </p>
     }}
  </div>;
};