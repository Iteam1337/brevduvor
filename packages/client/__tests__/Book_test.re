open Jest;
open Expect;
open ReactTestingLibrary;

let resultReturned = ref(false);

let mocks = [|
  {
    "request": {
      "query": Book.AllDestinationsQuery.gql(. Book.AllDestinations.query),
    },
    "result": () => {
      resultReturned := true;
      {
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
      };
    },
  },
|];

let mocks2 = (mocks[0], InitDrone_test.mocks[0]);

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

  Skip.testAsync("dispatches notification", finish => {
    open I18n.Translations;

    let element =
      <TestUtils.MockedProvider2 mocks=mocks2>
        <Book />
        <Toast.Container />
      </TestUtils.MockedProvider2>
      |> render;

    Js.Promise.(
      TestUtils.waitForElement(() =>
        element
        |> getByText(
             ~matcher=`Str(_toString(`SWEDISH, BookTrip_PrepareTrip_Button)),
           )
      )
      |> then_(_ => {
           Js.log2("resultReturnedBook", resultReturned^);
           FireEvent.change(
             element |> getByTestId("select-from"),
             ~eventInit={
               "target": {
                 "value": "1",
               },
             },
           );

           TestUtils.ReactTestUtils.act(() => {
             FireEvent.change(
               element |> getByTestId("select-to"),
               ~eventInit={
                 "target": {
                   "value": "1",
                 },
               },
             );
             element
             |> getByText(
                  ~matcher=
                    `Str(_toString(`SWEDISH, BookTrip_PrepareTrip_Button)),
                )
             |> FireEvent.click;

             Js.log2(
               "resultReturnedInitDrone",
               InitDrone_test.resultReturned^,
             );

             TestUtils.waitForElementToBeRemoved(() =>
               element
               |> getByText(
                    ~matcher=
                      `Str(_toString(`SWEDISH, BookTrip_PrepareTrip_Button)),
                  )
             )
             |> then_(_ => {
                  element |> debug();
                  element |> expect |> toMatchSnapshot |> finish |> resolve;
                })
             |> ignore;
           })
           |> resolve;
         })
      |> ignore
    );
  });
});