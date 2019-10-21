[@react.component]
let make = (~drone: Shared.Drone.t) => {
  let ({translationsToString, _}, _): LocaleContext.t = LocaleContext.use();
  <div>
    <Typography.P className="font-bold text-sm">
      {translationsToString(BookTrip_From_Label)}
    </Typography.P>
    <span> drone.start.alias->React.string </span>
    <Typography.P className="font-bold text-sm">
      {translationsToString(BookTrip_To_Label)}
    </Typography.P>
    <span> drone.stop.alias->React.string </span>
    <Typography.P className="font-bold text-sm mt-4">
      {translationsToString(GeoLocation_Latitude)}
    </Typography.P>
    <span>
      {drone.currentPos.lat
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </span>
    <Typography.P className="font-bold text-sm">
      {translationsToString(GeoLocation_Longitude)}
    </Typography.P>
    <span>
      {drone.currentPos.lon
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </span>
  </div>;
};