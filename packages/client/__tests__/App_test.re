open Jest;
open Expect;
open ReactTestingLibrary;

describe("App", () =>
  test("renders", () => {
    let component =
      <TestUtils.MockedProvider> <App /> </TestUtils.MockedProvider>;

    component |> render |> container |> expect |> toMatchSnapshot;
  })
);
