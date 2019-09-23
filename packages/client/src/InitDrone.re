module InitDroneMutationConfig = [%graphql
  {|
  mutation InitDroneMutation($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop) {
      id
      start {
        lat
        lon
      }
      stop {
        lat
        lon
      }
      currentPos {
        lat
        lon
      }
      bearing
      status
      batteryStatus
      departure
      eta
    }
  }
|}
];

module InitDroneMutation =
  ReasonApolloHooks.Mutation.Make(InitDroneMutationConfig);

[@react.component]
let make = (~start, ~stop) => {
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
         | Data(data) => Js.log(data)
         | Loading
         | Called
         | NoData => ()
         | Error(error) => Js.log(error)
         };
         Js.Promise.resolve();
       })
    |> ignore;
  };

  <div>
    <Button.Primary onClick=initDrone>
      {React.string("Starta resa")}
    </Button.Primary>
  </div>;
};