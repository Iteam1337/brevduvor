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
    ->FutureJs.fromPromise(Js.String.make)
    ->Future.mapOk(
        (
          result:
            ReasonApolloHooks.Mutation.controledVariantResult(
              StartDroneMutationConfig.t,
            ),
        ) =>
        switch (result) {
        | Data(data) =>
          Belt.Result.Ok(data##startDrone##id)->handleDroneInitResponse
        | Loading
        | Called
        | NoData => Belt.Result.Error({js|Fick ingen data|js})->Js.log
        | Error(error) => Belt.Result.Error(error##message)->Js.log
        }
      )
    ->Future.mapError(Js.log2("ERROR: Error in StartDroneMutation\n\n"))
    ->ignore;
  };

  <div>
    <Button.Primary
      onClick=startDrone className="mt-4 bg-green-400 hover:bg-green-500">
      {React.string({js| Boka |js})}
    </Button.Primary>
  </div>;
};
