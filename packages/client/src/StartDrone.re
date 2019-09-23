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
  | Data(dronePosition) =>
    Js.log2("DronePosition", dronePosition);
    <p> {js|Drönare kontaktad.|js}->React.string </p>;
  | Loading => <p> {js|Får kontakt med drönare|js}->React.string </p>
  | NoData => <p> {js|Ingen kontakt med drönaren ännu.|js}->React.string </p>
  | Error(_) => <p> {js|Någonting gick fel.|js}->React.string </p>
  };
};
