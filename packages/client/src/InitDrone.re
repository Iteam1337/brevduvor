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
  let notifications = React.useContext(Notifications.Context.t);
  let (initDroneMutation, simple, _full) = InitDroneMutation.use();

  React.useEffect1(
    () => {
      let dispatchNotification = notificationType =>
        notifications.updateNotifications(
          Notifications.Notification.make(
            ~notificationType,
            ~timeout=Some(5000),
            (),
          ),
        );

      switch (simple) {
      | Data(_d) =>
        dispatchNotification(
          Info(I18n.Translations.BookTrip_TripPrepared_Message),
        )
      | Error(_e) => dispatchNotification(Error(I18n.Error.NoDataFromServer))
      | _ => ()
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
       /* TODO(@all): Use the error-message here */
       React.null
     }}
  </div>;
};
