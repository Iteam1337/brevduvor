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
       Js.log2("InitDrone", d);
       notifications.updateNotifications(
         Notifications.Notification.make(
           ~notificationType=
             Info(I18n.Translations.BookTrip_TripPrepared_Message),
           ~timeout=Some(5000),
           (),
         ),
       );
       <StartDrone id=d##initDrone##id handleDroneInitResponse />;
     | Loading => <Loader.Inline isLoading=true />
     | Called
     | NoData =>
       <Button.Primary onClick=initDrone className="mt-5">
         I18n.Translations.BookTrip_PrepareTrip_Button
       </Button.Primary>
     | Error(_) =>
       /* TODO(@all): Use the error-message here */
       notifications.updateNotifications(
         Notifications.Notification.make(
           ~notificationType=Error(I18n.Error.NoDataFromServer),
           ~timeout=Some(5000),
           (),
         ),
       );
       React.null;
     }}
  </div>;
};
