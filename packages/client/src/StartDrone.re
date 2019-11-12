module StartDroneMutationConfig = [%graphql
  {|
  mutation StartDroneMutation($id: String!) {
    startDrone(id: $id) {
      id
    }
  }
|}
];

module StartDroneMutation =
  ReasonApolloHooks.Mutation.Make(StartDroneMutationConfig);

[@react.component]
let make = (~id, ~handleDroneInitResponse) => {
  let (startDroneMutation, simple, _) = StartDroneMutation.use();
  let notifications = React.useContext(Notifications.Context.t);

  let startDrone = _ => {
    startDroneMutation(
      ~variables=StartDroneMutationConfig.make(~id, ())##variables,
      (),
    )
    |> ignore;
  };

  switch (simple) {
  | Data(data) =>
    data##startDrone##id->handleDroneInitResponse;

    notifications.updateNotifications(
      Notifications.Notification.make(
        ~notificationType=Success(BookTrip_Booking_Finished),
        ~timeout=Some(5000),
        (),
      ),
    );
    React.null;
  | Loading
  | Called
  | NoData =>
    <Button.Primary
      onClick=startDrone className="mt-4 bg-green-400 hover:bg-green-500 mt-5">
      I18n.Translations.BookTrip_Button
    </Button.Primary>
  | Error(error) =>
    notifications.updateNotifications(
      Notifications.Notification.make(
        ~notificationType=Error(ErrorBookingDrone),
        ~timeout=Some(5000),
        (),
      ),
    );
    Belt.Result.Error(error##message)->Js.log;
    React.null;
  };
};
