[@react.component]
let make = (~id) => {
  let response = DroneSubscription.use(~id, ());
  let notifications = React.useContext(Notifications.Context.t);

  /* curried for less repetition */
  let dispatchNotification = notificationMessage =>
    notifications.updateNotifications(
      Notifications.Notification.make(
        ~notificationType=notificationMessage,
        ~timeout=Some(5000),
        (),
      ),
    );

  <div className="w-full min-h-screen flex">
    {switch (response) {
     | Data(data) =>
       data##droneStatus
       ->Belt.Option.map(Shared.Drone.make)
       ->Belt.Option.map(drone =>
           <>
             <SideMenu> <DroneStatus drone /> </SideMenu>
             <div className="w-full relative min-h-screen">
               <Map
                 departingPosition={drone.start}
                 currentDestination={drone.stop}
                 currentPosition={drone.currentPos}
               />
             </div>
           </>
         )
       ->Belt.Option.getWithDefault(
           <Typography.Error> NoDataFromServer </Typography.Error>,
         )
     | Loading =>
       dispatchNotification(
         Info(I18n.Translations.DroneStatus_Loading_Position),
       );
       React.null;
     | NoData =>
       dispatchNotification(Error(I18n.Error.NoDroneWithId));
       React.null;
     | Error(_) =>
       dispatchNotification(Error(I18n.Error.NoDroneWithIdError));
       React.null;
     }}
  </div>;
};
