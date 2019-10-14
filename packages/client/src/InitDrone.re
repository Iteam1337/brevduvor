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
           I18n.Translations.(toString(BookTrip_TripPrepared_Message))
           ->React.string
         </p>
         <Button.Primary
           className="mt-4 bg-green-400"
           onClick={_ => ReasonReactRouter.push("/resor")}>
           I18n.Translations.(toString(BookTrip_GoToOverview_Button))
           ->React.string
         </Button.Primary>
       </div>
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-4">
         I18n.Translations.(toString(BookTrip_PrepareTrip_Button))
         ->React.string
       </Button.Primary>
     | Error(error) => error##message->React.string
     }}
  </div>;
};