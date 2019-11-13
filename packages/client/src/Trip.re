[@react.component]
let make = (~id) => {
  let (simple, _full) = DroneSubscription.use(~id, ());

  let dispatchNotification =
    Notifications.Dispatch.make(React.useContext(Notifications.Context.t));

  NotificationHook.use(
    () => {
      switch (simple) {
      | Error(_) => dispatchNotification(Error(NoDroneWithIdError))
      | NoData => dispatchNotification(Error(NoDroneWithId))
      | Loading => dispatchNotification(Info(DroneStatus_Loading_Position))
      | Data(_) => ()
      };
      None;
    },
    [||],
  );

  <div className="w-full min-h-screen flex">
    {switch (simple) {
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
     | Error(_)
     | Loading
     | NoData => React.null
     }}
  </div>;
};