module GetRouteConfig = [%graphql
  {|
  query GetRoute($start: DestinationInput!, $stop: DestinationInput!) {
    getRoute(start: $start, stop: $stop) {
      trips {
        geoJson {
          coordinates
          _type: type
        }

      }
    }
  }
|}
];

module GetRouteQuery = ReasonApolloHooks.Query.Make(GetRouteConfig);

let use = (~departingPosition, ~destination) => {
  let (shouldSkip, setShouldSkip) = React.useState(_ => true);

  let (simple, _full) =
    Belt.Option.(
      GetRouteQuery.use(
        ~skip=shouldSkip,
        ~variables=
          GetRouteConfig.make(
            ~start=
              Shared.GeoPosition.tToJs(
                departingPosition->getWithDefault(Shared.GeoPosition.empty),
              ),
            ~stop=
              Shared.GeoPosition.tToJs(
                destination->getWithDefault(Shared.GeoPosition.empty),
              ),
            (),
          )##variables,
        (),
      )
    );

  (simple, setShouldSkip);
};