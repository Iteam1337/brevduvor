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

describe("Book", () => {
  test("renders loading initially", () => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    element |> container |> expect |> toMatchSnapshot;
  });

  testAsync("renders with data", finish => {
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
