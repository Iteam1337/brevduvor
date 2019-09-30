module DronePositionSubscriptionConfig = [%graphql
  {|
  subscription DronePositionSubscription($id: String!) {
    dronePosition(id: $id) {
      id
      status
      batteryStatus
      currentPos {
        lat
        lon
      }
      start {
        lat
        lon
      }
      stop {
        lat
        lon
      }
    }
  }
|}
];

module DronePositionSubscription =
  ReasonApolloHooks.Subscription.Make(DronePositionSubscriptionConfig);

[@react.component]
let make = (~id) => {
  let (simple, _full) =
    DronePositionSubscription.use(
      ~variables=DronePositionSubscriptionConfig.make(~id, ())##variables,
      (),
    );

  Js.log2("data: ", simple);

  switch (simple) {
  | Data(data) =>
    data##dronePosition
    ->Belt.Option.map(drone => {
        let {Shared.Drone.currentPos, start, stop} = drone->Shared.Drone.make;
        <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
          <Map
            departingPosition=start
            currentDestination=stop
            currentPosition=currentPos
          />
        </div>;
      })
    ->Belt.Option.getWithDefault(React.null)
  | Loading => <p> {j|Laddar drönares position|j}->React.string </p>
  | NoData =>
    <p> {j|Det verkar inte finnas någon drönare med detta id.|j} </p>
  | Error(_) =>
    <p>
      {j|Någonting verkar ha gått fel. Kanske finns det ingen drönare med detta id.|j}
      ->React.string
    </p>
  };
};
