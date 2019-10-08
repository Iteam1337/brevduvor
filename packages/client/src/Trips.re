module AllDrones = [%graphql {|
  query Drones {
    drones
  }
|}];

module AllDronesQuery = ReasonApolloHooks.Query.Make(AllDrones);

[@react.component]
let make = () => {
  let (response, _) = AllDronesQuery.use();
  <>
    {switch (response) {
     | Loading => "Loading"->React.string
     | Error(e) => e##message->React.string
     | NoData => "No data"->React.string
     | Data(data) =>
       switch (data##drones->Belt.Array.length) {
       | 0 => {j|Vi kunde inte hitta några aktiva drönare|j}->React.string
       | _ =>
         data##drones
         ->Belt.Array.map(id => <DroneListItem key=id id />)
         ->React.array
       }
     }}
  </>;
};