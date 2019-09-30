module DronePositionSubscriptionConfig = [%graphql
  {|
  subscription DronePositionSubscription($id: String!) {
    dronePosition(id: $id) {
      id
      bearing
      departure
      eta
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

type droneState = Shared.GeoPosition.t;

let initialState: droneState = {alias: "", lat: 0.0, lon: 0.0};

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