module GetRoute = [%graphql
  {|
  query GetRoute($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      trips {
        geoJson {
          coordinates
        }
      }
    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRoute);

[@react.component]
let make = (~start, ~stop, ~onData) =>
  switch (start) {
  | Some(start) =>
    switch (stop) {
    | Some(stop) =>
      let (skip, setSkip) = React.useState(() => true);

      let (simple, _full) =
        GetRouteQuery.use(
          ~skip,
          ~variables=
            GetRoute.make(
              ~start=Shared.GeoPosition.tToJs(start),
              ~stop=Shared.GeoPosition.tToJs(stop),
              (),
            )##variables,
          (),
        );

      switch (simple) {
      | NoData =>
        Js.log("hey");
        <Button.Primary className="mt-5" onClick=(_ => setSkip(_ => false))>
          {js|Hämta rutt|js}->React.string
        </Button.Primary>;
      | Data(data) =>
        setSkip(_ => true);
        let routes =
          data##getRoute##trips
          ->Belt.Array.map(trip => trip##geoJson##coordinates);

        routes->Js.log;

        let trips = [%bs.raw
          {|
            routes.map((trip) => {
              return trip.map(coords => {
                return {location: coords}
              })
            })
          |}
        ];

        let waypoints =
          trips
          ->Belt.Array.map(ReactMapGl.Waypoints.make)
          ->Belt.Array.get(0);

        waypoints->onData;

        <Button.Primary className="mt-5" onClick=(_ => setSkip(_ => false))>
          {js|Hämta rutt|js}->React.string
        </Button.Primary>;
      | Error(e) =>
        Js.log(e);
        <div> "Error"->React.string </div>;
      | Loading => {js|Loading|js}->React.string
      };
    | None => React.null
    }
  | None => React.null
  };