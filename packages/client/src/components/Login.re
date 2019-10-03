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

[@react.component]
let make = () => {
  let (loginMutation, _simple, _full) = LoginMutation.use();

  let login = (username, password) => {
    loginMutation(
      ~variables=
        LoginMutationConfig.make(~username, ~password, ())##variables,
      (),
    )
    |> Js.Promise.then_(
         (
           result:
             ReasonApolloHooks.Mutation.controledVariantResult(
               LoginMutationConfig.t,
             ),
         ) => {
         switch (result) {
         | Data(data) => Js.log(data)
         | Called => Js.log("Mutation login called")
         | Loading => Js.log("Loading")
         | NoData => Js.log("No data")
         | Error(error) => Js.log(error)
         };

         Js.Promise.resolve(result);
       });
  };

  let _handleSubmit = event => {
    event->ReactEvent.Synthetic.preventDefault;
    let formData = ReactEvent.Form.target(event);
    let username = formData##username##value;
    let password = formData##password##value;

    ignore(login(username, password));

    ();
  };

  <div
    className="flex fixed bg-white w-full min-h-screen z-50 items-center justify-center">
    <div className="w-full max-w-xs">
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