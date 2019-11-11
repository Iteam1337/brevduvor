module StartDroneMutationConfig = [%graphql
  {|
  mutation StartDroneMutation($id: String!) {
    startDrone(id: $id) {
      id
    }
  }
|}
];

module StartDroneMutation =
  ReasonApolloHooks.Mutation.Make(StartDroneMutationConfig);

[@react.component]
let make = (~id, ~handleDroneInitResponse) => {
  let (startDroneMutation, simple, _) = StartDroneMutation.use();

  let startDrone = _ => {
    startDroneMutation(
      ~variables=StartDroneMutationConfig.make(~id, ())##variables,
      (),
    )
    |> ignore;
  };

  switch (simple) {
  | Data(data) =>
    data##startDrone##id->handleDroneInitResponse;
    <Alert.Info className="mt-5"> BookTrip_Booking_Finished </Alert.Info>;
  | Loading
  | Called
  | NoData =>
    <Button.Primary
      onClick=startDrone className="mt-4 bg-green-400 hover:bg-green-500 mt-5">
      I18n.Translations.BookTrip_Button
    </Button.Primary>
  | Error(error) =>
    Belt.Result.Error(error##message)->Js.log;
    <Alert.Error> I18n.Error.ErrorBookingDrone </Alert.Error>;
  };
};
