module DronePositionSubscriptionConfig = [%graphql
  {|
  subscription DronePositionSubscription($id: String!) {
    dronePosition(id: $id) {
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
let make = (~id, ~handleDroneStatusSubscriptionData as cb) => {
  let (simple, _full) =
    DronePositionSubscription.use(
      ~variables=DronePositionSubscriptionConfig.make(~id, ())##variables,
      (),
    );
  switch (
    (
      simple:
        ReasonApolloHooks.Subscription.variant(
          DronePositionSubscriptionConfig.t,
        )
    )
  ) {
  | Data(data) =>
    switch (data##dronePosition) {
    | Some(d) =>
      let dronePos: Shared.GeoPosition.t = {
        alias: "Drone",
        lat: d##currentPos##lat,
        lon: d##currentPos##lon,
      };

      dronePos->cb;
    | _ => Js.log("nodata")
    }

  | NoData => Js.log("ingen data")
  | Loading => Js.log("Loading")
  | Error(e) => Js.log(e)
  };

  <div />;
};