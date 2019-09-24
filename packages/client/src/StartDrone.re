module StartDroneMutationConfig = [%graphql
  {|
  mutation StartDroneMutation($id: String!) {
    startDrone(id: $id) {
      id
    }
  }
|}
];

module StartDroneMutation =
  ReasonApolloHooks.Mutation.Make(StartDroneMutationConfig);

[@react.component]
let make = (~id, ~handleDroneInitResponse) => {
  let (startDroneMutation, _simple, _full) =
    StartDroneMutation.use(
      ~variables=StartDroneMutationConfig.make(~id, ())##variables,
      (),
    );

  let startDrone = _ => {
    startDroneMutation()
    |> Js.Promise.then_(
         (
           result:
             ReasonApolloHooks.Mutation.controledVariantResult(
               StartDroneMutationConfig.t,
             ),
         ) => {
         switch (result) {
         | Data(data) =>
           Belt.Result.Ok(data##startDrone##id->Some)->handleDroneInitResponse
         | Loading
         | Called
         | NoData =>
           ();
           Belt.Result.Error({js|Fick ingen data|js})->Js.log;
         | Error(error) =>
           ();
           Belt.Result.Error(error##message)->Js.log;
         };
         Js.Promise.resolve();
       })
    |> ignore;
  };

  /* when we have the Data, propagate sub-id to App as a Belt.Result.Ok */
  // switch (simple) {
  // | Data(dronePosition) =>
  //   Js.log2("DronePosition", dronePosition);
  //   <p> {js|Drönare kontaktad.|js}->React.string </p>;
  // | Loading => <p> {js|Får kontakt med drönare|js}->React.string </p>
  // | NoData => <p> {js|Ingen kontakt med drönaren ännu.|js}->React.string </p>
  // | Error(_) => <p> {js|Någonting gick fel.|js}->React.string </p>
  // };
  <div>
    <Button.Primary onClick=startDrone className="mt-4">
      {React.string({js| Boka |js})}
    </Button.Primary>
  </div>;
};