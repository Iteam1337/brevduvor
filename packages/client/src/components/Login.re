module LoginMutationConfig = [%graphql
  {|

  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
    }
  }

|}
];

module LoginMutation = ReasonApolloHooks.Mutation.Make(LoginMutationConfig);

type loginFormState = {
  hasError: bool,
  errorMessage: string,
  isLoading: bool,
};

type loginFormActions =
  | SetError(string)
  | UnsetError
  | ToggleLoading(bool);

let initialState: loginFormState = {
  hasError: false,
  errorMessage: "",
  isLoading: false,
};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | SetError(errorMessage) => {...state, hasError: true, errorMessage}
        | UnsetError => {...state, hasError: false, errorMessage: ""}
        | ToggleLoading(isLoading) => {...state, isLoading}
        },
      initialState,
    );

  let (loginMutation, loginResponse, _f) = LoginMutation.use();

  React.useEffect1(
    () =>
      switch (loginResponse) {
      | Data(payload) =>
        payload->Js.log;
        dispatch(ToggleLoading(false));
        None;
      | Error(error) =>
        error->Js.log;
        dispatch(ToggleLoading(false));
        None;
      | Loading =>
        dispatch(ToggleLoading(true));
        None;
      | NoData =>
        dispatch(ToggleLoading(false));
        None;
      | Called => None
      },
    [|loginResponse|],
  );

  let login = (username, password) => {
    loginMutation(
      ~variables=
        LoginMutationConfig.make(~username, ~password, ())##variables,
      (),
    );
  };

  let _handleSubmit = event => {
    event->ReactEvent.Synthetic.preventDefault;
    let formData = ReactEvent.Form.target(event);
    let username = formData##username##value;
    let password = formData##password##value;

    ignore(login(username, password));

    ();
  };

  state->Js.log;

  <div
    className="flex fixed bg-gray-600 w-full min-h-screen z-50 items-center justify-center">
    <div className="w-full max-w-xs">
      <Loader.Inline isLoading={state.isLoading} />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit=_handleSubmit>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            "Username"->React.string
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type_="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            "Password"->React.string
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type_="password"
            placeholder="****"
          />
        </div>
        <input
          type_="submit"
          className="w-full text-xs bg-blue-400 hover:bg-blue-500 text-white font-semibold
        py-3 px-4 rounded tracking-wide border border-blue-400 hover:border-blue-500"
        />
      </form>
    </div>
  </div>;
};