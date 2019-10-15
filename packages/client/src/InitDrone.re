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
let make = (~start, ~stop, ~handleDroneStartResponse) => {
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
     | Data(d) =>
       <div>
         <p className="mt-5">
           I18n.Translations.(toString(BookTrip_TripPrepared_Message))
           ->React.string
         </p>
         <StartDrone id=d##initDrone##id handleDroneStartResponse />
       </div>
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-8">
         I18n.Translations.(toString(BookTrip_PrepareTrip_Button))
         ->React.string
       </Button.Primary>
     | Error(error) => error##message->React.string
     }}
  </div>;
};