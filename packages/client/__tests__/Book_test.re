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
  test("renders", () => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render
      |> getByText(~matcher=`Str("Data!"));

    expect(element) |> toMatchSnapshot;
  })
);
