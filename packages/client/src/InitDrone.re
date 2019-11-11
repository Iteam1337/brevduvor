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
       <>
         <Alert.Info className="mt-5">
           I18n.Translations.BookTrip_TripPrepared_Message
         </Alert.Info>
         <StartDrone id=d##initDrone##id handleDroneInitResponse />
       </>
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-5">
         I18n.Translations.BookTrip_PrepareTrip_Button
       </Button.Primary>
     | Error(_) =>
       /* TODO(@all): Use the error-message here */
       <Alert.Error> I18n.Error.NoDataFromServer </Alert.Error>
     }}
  </div>;
};