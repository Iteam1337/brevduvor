open Jest;
open Expect;
open ReactTestingLibrary;

let mocks = [|
  {
    "request": {
      "query": Book.AllDestinationsQuery.gql(. Book.AllDestinations.query),
    },
    "result": {
      "data": {
        "allDestinations": [|
          {
            "alias": "Storuman",
            "lat": 13.333337,
            "lon": 16.666666,
            "__typename": "Destination",
          },
          {
            "alias": "Slussfors",
            "lat": 13.333337,
            "lon": 16.666666,
            "__typename": "Destination",
          },
        |],
      },
    },
  },
|];

let mockId = "a8cc4a84-98a8-4362-bf29-6a99198a3626";
let mutationMock = [|
  {
    "request": {
      "query":
        StartDrone.StartDroneMutation.gql(.
          StartDrone.StartDroneMutationConfig.query,
        ),
      "variables":
        StartDrone.StartDroneMutationConfig.make(~id=mockId, ())##variables,
    },
    "result": {
      "data": {
        "startDrone": {
          "id": mockId,
          "__typename": "StartDroneResponse",
        },
      },
    },
  },
|];

describe("Book", () => {
  test("renders loading initially", () => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    element |> container |> expect |> toMatchSnapshot;
  });

  testAsync("renders dropdown options", finish => {
    open I18n.Translations;

    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    Js.Promise.(
      TestUtils.waitForElement(() =>
        element
        |> getByText(~matcher=`Str(_toString(`SWEDISH, BookTrip_To_Label)))
      )
      |> then_(_ =>
           element
           |> container
           |> expect
           |> toMatchSnapshot
           |> finish
           |> resolve
         )
      |> ignore
    );
  });
});