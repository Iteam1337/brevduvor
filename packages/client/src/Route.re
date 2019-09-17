module GetRouteConfig = [%graphql
  {|
  query GetRouteQuery($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      geoJson {
        type
        coordinates
      }
      distance
    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRouteConfig);

[@react.component]
let make = (~position, ~destination, ~callback) => {
  let getRouteParams =
    GetRouteConfig.make(~start=position, ~stop=destination, ());

  let (simple, _full) =
    GetRouteQuery.use(
      ~variables=getRouteParams##variables,
      ~notifyOnNetworkStatusChange=true,
      (),
    );
  ();

  React.useEffect1(
    () => {
      Js.log("running effect");
      callback(simple);
      None;
    },
    [|simple|],
  );

  React.null;
};