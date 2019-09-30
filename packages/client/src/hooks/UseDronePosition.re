module DronePositionSubscriptionConfig = [%graphql
  {|
  subscription DronePositionSubscription($id: String!) {
    dronePosition(id: $id) {
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

module DronePositionSubscription =
  ReasonApolloHooks.Subscription.Make(DronePositionSubscriptionConfig);

let use = (~id=?, ()) => {
  let (simple, _full) =
    DronePositionSubscription.use(
      ~variables=
        DronePositionSubscriptionConfig.make(
          ~id=id->Belt.Option.getWithDefault(""),
          (),
        )##variables,
      (),
    );

  simple;
};