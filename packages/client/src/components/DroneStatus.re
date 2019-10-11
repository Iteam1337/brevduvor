[@react.component]
let make = (~drone: Shared.Drone.t) => {
  <div>
    <p> "Latitud: "->React.string </p>
    <p>
      {drone.currentPos.lat
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
    <p> "Longitud: "->React.string </p>
    <p>
      {drone.currentPos.lon
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
  </div>;
};
