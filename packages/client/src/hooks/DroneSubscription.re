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

let use = (~id=?, ()) => {
  let (simple, _full) =
    DroneStatusSubscription.use(
      ~variables=
        DroneStatusSubscriptionConfig.make(
          ~id=id->Belt.Option.getWithDefault(""),
          (),
        )##variables,
      (),
    );

  simple;
};