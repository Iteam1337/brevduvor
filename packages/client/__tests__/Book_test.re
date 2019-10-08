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
        "destination": {
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
    <TestUtils.ApolloReactTesting.MockedProvider mocks>
      <Book />
    </TestUtils.ApolloReactTesting.MockedProvider>
    |> render
    |> expect
    |> toMatchSnapshot
  )
);
