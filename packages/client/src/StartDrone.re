module StartDroneSubscriptionConfig = [%graphql
  {|
  mutation StartDroneSubscription($id: String!) {
    startDrone(id: $id) {
      id
    }
  }
|}
];

module StartDroneSubscription =
  ReasonApolloHooks.Subscription.Make(StartDroneSubscriptionConfig);

[@react.component]
let make = (~id, ~handleDroneResponse as _hd) => {
  let (simple, _full) =
    StartDroneSubscription.use(
      ~variables=StartDroneSubscriptionConfig.make(~id, ())##variables,
      (),
    );

  /* when we have the Data, propagate sub-id to App as a Belt.Result.Ok */
  switch (simple) {
  | Data(dronePosition) => Js.log2("DronePosition", dronePosition)
  | _ => Js.log("Other")
  };

  <div />;
};
