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
        "allDestinations": {
          "alias": "Storuman",
          "lat": 13.333337,
          "lon": 16.666666,
        },
      },
    },
  },
|];

describe("Book", () =>
  test("renders", () =>
    <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
    |> render
    |> expect
    |> toMatchSnapshot
  )
);
