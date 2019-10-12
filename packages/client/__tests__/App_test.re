open Jest;
open Expect;
open ReactTestingLibrary;

describe("App", () =>
  test("renders", () =>
    <App /> |> render |> expect |> toMatchSnapshot
  )
);
