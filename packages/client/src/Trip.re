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

  switch (simple) {
  | Data(data) =>
    let {Shared.Drone.currentPos, start, stop} =
      data##droneStatus->Shared.Drone.make;

    <div className="w-full bg-gray-400 h-12 relative min-h-screen">
      <Map
        departingPosition=start
        currentDestination=stop
        currentPosition=currentPos
      />
    </div>;

  | Loading => <p> {j|Laddar drönares position|j}->React.string </p>
  | NoData =>
    <p>
      {j|Det verkar inte finnas någon drönare med detta id.|j}->React.string
    </p>
  | Error(_) =>
    <p>
      {j|Någonting verkar ha gått fel. Kanske finns det ingen drönare med detta id.|j}
      ->React.string
    </p>
  };
};