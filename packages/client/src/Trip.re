[@react.component]
let make = (~id) => {
  let response = DroneSubscription.use(~id, ());

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
       <SideMenu>
         <Alert.Info>
           I18n.Translations.DroneStatus_Loading_Position
         </Alert.Info>
       </SideMenu>
     | NoData => <Alert.Error> NoDroneWithId </Alert.Error>
     | Error(_) => <Alert.Error> NoDroneWithIdError </Alert.Error>
     }}
  </div>;
};
