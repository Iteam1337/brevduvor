open Jest;
open Expect;
open ReactTestingLibrary;

let mocks = [|
  {
    "request": {
      "query": Book.AllDestinationsQuery.gql(. Book.AllDestinations.query),
    },
    "result": () => {
      "data": {
        "allDestinations": [
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
        ],
      },
    },
  },
|];

describe("Book", () =>
  testAsync("renders with data", finish => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    waitForElement(() => element |> getByText(~matcher=`Str("Till")))
    |> Js.Promise.then_(_ => {
         TestUtils.ReactTestUtils.act(() => {
           expect(container(element)) |> toMatchSnapshot |> finish;
           Js.Promise.resolve();
         })
         |> Js.Promise.then_(Js.Promise.resolve)
         |> ignore;
         Js.Promise.resolve();
       })
    |> ignore;
  })
);
