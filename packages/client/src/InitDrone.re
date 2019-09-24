module InitDroneMutationConfig = [%graphql
  {|
  mutation InitDroneMutation($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop) {
      id
    }
  }
|}
];

type event =
  | Id(string)
  | NoId;

module InitDroneMutation =
  ReasonApolloHooks.Mutation.Make(InitDroneMutationConfig);

[@react.component]
let make = (~start, ~stop, ~handleDroneInitResponse) => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | Id(id) => `Id(id)
        | NoId => `NoId
        },
      `NoId,
    );

  let (initDroneMutation, _simple, _full) = InitDroneMutation.use();

  let initDrone = _ => {
    initDroneMutation(
      ~variables=
        InitDroneMutationConfig.make(
          ~start=start->Shared.GeoPosition.tToJs,
          ~stop=stop->Shared.GeoPosition.tToJs,
          (),
        )##variables,
      (),
    )
    |> Js.Promise.then_(
         (
           result:
             ReasonApolloHooks.Mutation.controledVariantResult(
               InitDroneMutationConfig.t,
             ),
         ) => {
         switch (result) {
         | Data(data) =>
           //  Belt.Result.Ok(data##initDrone##id)->handleDroneInitResponse;
           switch (data##initDrone##id) {
           | Some(id) => dispatch(Id(id))
           | None => dispatch(NoId)
           }
         | Loading
         | Called
         | NoData =>
           ();
           Belt.Result.Error({js|Fick ingen data|js})
           ->handleDroneInitResponse;
         | Error(error) =>
           ();
           Belt.Result.Error(error##message)->handleDroneInitResponse;
         };
         Js.Promise.resolve();
       })
    |> ignore;
  };

  <div>
    {switch (state) {
     | `NoId =>
       <Button.Primary onClick=initDrone className="mt-4">
         {React.string({js| Förbered bokning |js})}
       </Button.Primary>
     | `Id(id) => <StartDrone id handleDroneInitResponse />
     }}
  </div>;
};