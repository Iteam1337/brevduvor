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
let make = (~start, ~stop, ~handleDroneInitResponse) => {
  let (initDroneMutation, simple, _full) = InitDroneMutation.use();
  let ({translationsToString, errorToString}, _): LocaleContext.t =
    LocaleContext.use();

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
         <Typography.P className="mt-5">
           {translationsToString(BookTrip_TripPrepared_Message)}
         </Typography.P>
         <StartDrone id=d##initDrone##id handleDroneInitResponse />
       </div>
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-5">
         {{translationsToString(BookTrip_PrepareTrip_Button)}->React.string}
       </Button.Primary>
     | Error(_) =>
       <Typography.Error>
         {errorToString(I18n.Error.NoDataFromServer)}
       </Typography.Error>
     }}
  </div>;
};