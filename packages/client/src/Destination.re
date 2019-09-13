let toRecord = destination => {
  Shared.GeoPosition.alias: destination##alias,
  lat: destination##lat,
  lon: destination##lon,
};

module AllDestinations = [%graphql
  {|
  query AllDestinations {
    allDestinations {
      alias
      lat
      lon
    }
  }
|}
];

module AllDestinationsQuery = ReasonApolloHooks.Query.Make(AllDestinations);

[@react.component]
let make = (~handleDestinationSelect) => {
  let (status, _) = AllDestinationsQuery.use();

  <div>
    {switch (status) {
     | Loading => <p> {React.string("Loading...")} </p>
     | Data(data) =>
       let destinations =
         data##allDestinations->Belt.Array.map(toRecord)->Belt.List.fromArray;
       <GeoSelectBox
         onChange=handleDestinationSelect
         selectOptions=destinations
       />;
     | NoData
     | Error(_) =>
       <p> {React.string("Could not get available end destinations.")} </p>
     }}
  </div>;
};