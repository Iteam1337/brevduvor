[@react.component]
let make = (~drone: Shared.Drone.t) => {
  <div>
    <Typography.P> I18n.Translations.GeoLocation_Latitude </Typography.P>
    <p>
      {drone.currentPos.lat
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
    <Typography.P> I18n.Translations.GeoLocation_Longitude </Typography.P>
    <p>
      {drone.currentPos.lon
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
  </div>;
};