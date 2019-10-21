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
  | SetError(ReasonApolloHooks.Mutation.error)
  | UnsetError
  | ToggleLoading(bool);

let initialState: state = Idle;

[@react.component]
let make = (~onLogin) => {
  let (state, dispatch) =
    React.useReducer(
      (_, action) =>
        switch (action) {
        | SetError(error) => Error(error##message)
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
        dispatch(SetError(error));
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

  let usernameInputRef = AutoFocus.use();
  <div
    className="flex fixed bg-background w-full min-h-screen z-50 items-center justify-center">
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit=handleSubmit>
        {switch (state) {
         | Error(errorMessage) =>
           <Typography.Error>
             errorMessage->I18n.Error.authErrorFromSignature
           </Typography.Error>
         | Idle => React.null
         | Loading => React.null
         }}
        <div className="mb-4">
          <Input.Text
            inputRef=usernameInputRef
            id="username"
            placeholder=I18n.Translations.Auth_Username_Placeholder
            label=I18n.Translations.Auth_Username_Label
          />
        </div>
        <div className="mb-6">
          <Input.Text
            id="password"
            placeholder=I18n.Translations.Auth_Password_Placeholder
            label=I18n.Translations.Auth_Password_Label
            type_="Password"
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