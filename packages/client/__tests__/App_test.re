open Jest;
open Expect;
open ReactTestingLibrary;

describe("App", () =>
  test("renders", () =>
    <App token=Some("xx") /> |> render |> expect |> toMatchSnapshot
  )
);