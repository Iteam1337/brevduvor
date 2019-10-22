[@react.component]
let make = (~id) => {
  let response = DroneSubscription.use(~id, ());
  let ({errorToString, translationsToString}, _): LocaleContext.t =
    LocaleContext.use();

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
           <Typography.Error>
             NoDataFromServer->errorToString
           </Typography.Error>,
         )
     | Loading =>
       <SideMenu>
         <Typography.P>
           {translationsToString(DroneStatus_Loading_Position)}
         </Typography.P>
       </SideMenu>
     | NoData =>
       <Typography.Error> {errorToString(NoDroneWithId)} </Typography.Error>
     | Error(_) =>
       <Typography.Error>
         {errorToString(NoDroneWithIdError)}
       </Typography.Error>
     }}
  </div>;
};