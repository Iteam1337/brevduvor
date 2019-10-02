[@react.component]
let make = (~data: Shared.Drone.t) => {
  Js.log(data);
  <div>
    <p> "Latitud: "->React.string </p>
    <p>
      {data.currentPos.lat
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
    <p> "Longitud: "->React.string </p>
    <p>
      {data.currentPos.lon
       ->Js.Float.toFixedWithPrecision(~digits=10)
       ->React.string}
    </p>
  </div>;
};