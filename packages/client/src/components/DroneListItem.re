[@react.component]
let make = (~id) => {
  Js.log(id);
  // let response = UseDroneStatus.use(~id, ());

  // switch (
  //   (
  //     response:
  //       ReasonApolloHooks.Subscription.variant(
  //         UseDroneStatus.DroneStatusSubscriptionConfig.t,
  //       )
  //   )
  // ) {
  // | Loading => "Loading"->React.string
  // | Error(e) => e##message->React.string
  // | NoData => "No data"->React.string
  // | Data(data) =>
  //   Js.log(data);
  //   <div> "Resor"->React.string </div>;
  // };
  <div> id->React.string </div>;
};