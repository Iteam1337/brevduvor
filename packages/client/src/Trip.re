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
           <Typography.Error> I18n.Error.NoDataFromServer </Typography.Error>,
         )
     | Loading =>
       <SideMenu>
         <Typography.P> I18n.Translations.UI_Loading </Typography.P>
       </SideMenu>
     | NoData
     | Error(_) =>
       <Typography.Error> I18n.Error.NoDroneWithId </Typography.Error>
     }}
  </div>;
};