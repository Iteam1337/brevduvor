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

  let dispatchNotification =
    Notifications.Dispatch.make(React.useContext(Notifications.Context.t));

  NotificationHook.use(
    () => {
      switch (simple) {
      | Data(_d) => dispatchNotification(Info(BookTrip_TripPrepared_Message))
      | Error(_e) => dispatchNotification(Error(NoDataFromServer))
      | Loading
      | Called
      | NoData => ()
      };
      None;
    },
    [|simple|],
  );

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
     | Data(d) => <StartDrone id=d##initDrone##id handleDroneInitResponse />
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-5">
         I18n.Translations.BookTrip_PrepareTrip_Button
       </Button.Primary>
     | Error(_) =>
       /* TODO(@all): Provide error recovery (link to start again or similar) */
       React.null
     }}
  </div>;
};