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
  | Data(data) when data##dronePosition->Belt.Option.isSome =>
    let {Shared.Drone.currentPos, _} = data##dronePosition->Shared.Drone.make;

    <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
      <Map ?departingPosition ?currentDestination currentPosition=currentPos />
    </div>;
  | Data(_)
  | NoData
  | Loading
  | Error(_) =>
    <div className="w-9/12 bg-gray-400 h-12 relative min-h-screen">
      <Map ?currentDestination ?departingPosition />
    </div>
  };
};