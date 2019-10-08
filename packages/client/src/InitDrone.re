module InitDroneMutationConfig = [%graphql
  {|
  mutation InitDroneMutation($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop) {
      id
    }
  }
|}
];

module InitDroneMutation =
  ReasonApolloHooks.Mutation.Make(InitDroneMutationConfig);

[@react.component]
let make = (~start, ~stop) => {
  let (initDroneMutation, simple, _full) = InitDroneMutation.use();

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
    ->ignore;
  };

  <div>
    {switch (simple) {
     | Data(_) =>
       <div>
         <p>
           {js|Du har nu förberett din bokning. Vi notifierar dig när det är dags att packa drönaren.|js}
           ->React.string
         </p>
         <Button.Primary
           className="mt-4 bg-green-400"
           onClick={_ => ReasonReactRouter.push("/resor")}>
           {js| Gå till överblicksvyn |js}->React.string
         </Button.Primary>
       </div>
     | Loading => "Loading"->React.string
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-4">
         {React.string({js| Förbered bokning |js})}
       </Button.Primary>
     | Error(error) => error##message->React.string
     }}
  </div>;
};
