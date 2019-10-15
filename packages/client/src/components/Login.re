module LoginMutationConfig = [%graphql
  {|

  mutation LoginMutation($username: RuleWrapper!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
    }
  }

|}
];

module LoginMutation = ReasonApolloHooks.Mutation.Make(LoginMutationConfig);

type state =
  | Error(string)
  | Loading
  | Idle;

type loginFormActions =
  | SetError(string)
  | UnsetError
  | ToggleLoading(bool);

let initialState: state = Idle;

[@react.component]
let make = (~onLogin) => {
  let (state, dispatch) =
    React.useReducer(
      (_, action) =>
        switch (action) {
        | SetError(errorMessage) => Error(errorMessage)
        | UnsetError => Idle
        | ToggleLoading(isLoading) => isLoading ? Loading : Idle
        },
      initialState,
    );

  let (loginMutation, loginResponse, _f) = LoginMutation.use();

  React.useEffect1(
    () => {
      switch (loginResponse) {
      | Data(payload) =>
        let authPayload = Shared.AuthPayload.make(payload);
        dispatch(ToggleLoading(false));
        onLogin(authPayload);
      | Error(error) =>
        dispatch(ToggleLoading(false));
        dispatch(SetError(error##message));
      | Loading => dispatch(ToggleLoading(true))
      | NoData => dispatch(ToggleLoading(false))
      | Called => ()
      };

      None;
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

  let handleSubmit = event => {
    event->ReactEvent.Synthetic.preventDefault;
    let formData = ReactEvent.Form.target(event);
    let username = formData##username##value;
    let password = formData##password##value;

    ignore(login(username, password));
  };

  let usernameInputRef = UseAutoFocus.use();

  <div
    className="flex fixed bg-gray-600 w-full min-h-screen z-50 items-center justify-center">
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit=handleSubmit>
        {switch (state) {
         | Error(errorMessage) => errorMessage->React.string
         | Idle => React.null
         | Loading => React.null
         }}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            I18n.Translations.(toString(Auth_Username_Label))->React.string
          </label>
          <input
            ref=usernameInputRef
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type_="text"
            placeholder=I18n.Translations.(
              toString(Auth_Username_Placeholder)
            )
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            I18n.Translations.(toString(Auth_Password_Label))->React.string
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type_="password"
            placeholder=I18n.Translations.(
              toString(Auth_Password_Placeholder)
            )
          />
        </div>
        {switch (state) {
         | Error(_) => React.null
         | Idle => <Loader.Inline isLoading=false />
         | Loading => <Loader.Inline isLoading=true />
         }}
        <Button.Primary
          type_="submit"
          className="w-full text-xs bg-blue-400 hover:bg-blue-500 text-white font-semibold
        py-3 px-4 rounded tracking-wide border border-blue-400 hover:border-blue-500">
          I18n.Translations.(toString(Auth_Login_Submit))->React.string
        </Button.Primary>
      </form>
    </div>
  </div>;
};