open Jest;
open Expect;
open ReactTestingLibrary;

let mockId = "a8cc4a84-98a8-4362-bf29-6a99198a3626";

let mocks = [|
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

let mockFunction = _ => ();

describe("StartDrone", () => {
  test("shows book button initially", () => {
    let element =
      <TestUtils.MockedProvider mocks>
        <StartDrone id=mockId handleDroneInitResponse=mockFunction />
      </TestUtils.MockedProvider>
      |> render;

    element |> container |> expect |> toMatchSnapshot;
  });

  testAsync("shows drone booked message after pressing book", finish => {
    open I18n.Translations;
    let element =
      <TestUtils.MockedProvider mocks>
        <StartDrone id=mockId handleDroneInitResponse=mockFunction />
      </TestUtils.MockedProvider>
      |> render;

    element
    |> ReactTestingLibrary.getByText(
         ~matcher=
           `Str(
             {
               _toString(`SWEDISH, I18n.Translations.BookTrip_Button);
             },
           ),
       )
    |> FireEvent.click;

    Js.Promise.(
      TestUtils.waitForElement(() =>
        element
        |> getByText(
             ~matcher=`Str(_toString(`SWEDISH, BookTrip_Booking_Finished)),
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

  testAsync("calls passed callback with droneId on success", finish => {
    open I18n.Translations;

    let spy = JestJs.inferred_fn();
    let fn = spy |> MockJs.fn;
    let mockFunction = e => fn(. e) |> ignore;

    let element =
      <TestUtils.MockedProvider mocks>
        <StartDrone id=mockId handleDroneInitResponse=mockFunction />
      </TestUtils.MockedProvider>
      |> render;

    element
    |> ReactTestingLibrary.getByText(
         ~matcher=
           `Str(
             {
               _toString(`SWEDISH, I18n.Translations.BookTrip_Button);
             },
           ),
       )
    |> FireEvent.click;

    Js.Promise.(
      TestUtils.waitForElement(() =>
        element
        |> getByText(
             ~matcher=`Str(_toString(`SWEDISH, BookTrip_Booking_Finished)),
           )
      )
      |> then_(_ =>
           expect(spy |> MockJs.calls)
           |> toEqual([|mockId|])
           |> finish
           |> resolve
         )
      |> ignore
    );
  });
});
