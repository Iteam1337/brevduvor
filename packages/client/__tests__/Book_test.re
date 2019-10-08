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
          "__typename": "Destination",
        },
      },
    },
  },
|];

describe("Book", () => {
  testAsync("renders 2", finish => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    TestUtils.ReactTestUtils.act(() => {
      expect(container(element)) |> toMatchSnapshot |> finish;
      Js.Promise.resolve();
    })
    |> ignore;
  });

  testAsync("renders", finish => {
    let element =
      <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider>
      |> render;

    waitForElement(() => element |> getByText(~matcher=`Str("data")))
    |> Js.Promise.then_(result => {
         Js.log2("Result", result);
         expect(element) |> toMatchSnapshot |> finish;
         Js.Promise.resolve();
       })
    |> ignore;
  });
});

/* testAsync("renders 2", finish => { */
/*   let element = */
/*     <TestUtils.MockedProvider mocks> <Book /> </TestUtils.MockedProvider> */
/*     |> render; */
/*   wait(0)->Future.get(_ => expect(element) |> toMatchSnapshot |> finish); */
/* }); */
