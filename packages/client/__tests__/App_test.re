open Jest;
open Expect;
open ReactTestingLibrary;

describe("App", () =>
  test("renders login screen initially", () => {
    let component =
      <TestUtils.MockedProvider> <App /> </TestUtils.MockedProvider> |> render;

    component |> container |> expect |> toMatchSnapshot;
  })
);
