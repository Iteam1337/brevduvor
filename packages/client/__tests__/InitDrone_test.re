open Jest;
open Expect;
open ReactTestingLibrary;

let mockStart =
  {
    "alias": "Storuman",
    "lat": 13.333337,
    "lon": 16.666666,
    "__typename": "Destination",
  }
  |> Shared.GeoPosition.tFromJs;

let mockEnd =
  {
    "alias": "Storuman",
    "lat": 13.333337,
    "lon": 16.666666,
    "__typename": "Destination",
  }
  |> Shared.GeoPosition.tFromJs;

let mocks = [|
  {
    "request": {
      "query":
        InitDrone.InitDroneMutation.gql(.
          InitDrone.InitDroneMutationConfig.query,
        ),
      "variables":
        InitDrone.InitDroneMutationConfig.make(
          ~start=mockStart->Shared.GeoPosition.tToJs,
          ~stop=mockEnd->Shared.GeoPosition.tToJs,
          (),
        )##variables,
    },
    "result": {
      "data": {
        "initDrone": {
          "id": "a8cc4a84-98a8-4362-bf29-6a99198a3626",
          "__typename": "InitDroneResponse",
        },
      },
    },
  },
|];

let mockFunction = _ => ();

describe("InitDrone", () => {
  test("shows prepare button initially", () => {
    let element =
      <TestUtils.MockedProvider mocks>
        <InitDrone
          start=mockStart
          stop=mockEnd
          handleDroneInitResponse=mockFunction
        />
      </TestUtils.MockedProvider>
      |> render;

    element |> container |> expect |> toMatchSnapshot;
  });

  testAsync("shows drone prepared message after pressing prepare", finish => {
    open I18n.Translations;

    let element =
      <TestUtils.MockedProvider mocks>
        <InitDrone
          start=mockStart
          stop=mockEnd
          handleDroneInitResponse=mockFunction
        />
        <Toast.Container />
      </TestUtils.MockedProvider>
      |> render;

    element
    |> ReactTestingLibrary.getByText(
         ~matcher=
           `Str(
             {
               _toString(
                 `SWEDISH,
                 I18n.Translations.BookTrip_PrepareTrip_Button,
               );
             },
           ),
       )
    |> FireEvent.click;

    Js.Promise.(
      TestUtils.waitForElement(() =>
        element
        |> getByText(
             ~matcher=
               `Str(_toString(`SWEDISH, BookTrip_TripPrepared_Message)),
           )
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