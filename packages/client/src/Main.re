[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  switch (url.path) {
  | ["start"] => <Start />
  | ["boka-resa"] => <Book />
  | ["leverans", id] => <Trip id />
  | _ => <p> "Blabla"->React.string </p>
  };
};