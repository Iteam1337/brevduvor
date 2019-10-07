[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  switch (url.path) {
  | [] => <Start />
  | ["boka-resa"] => <Book />
  | ["resor"] => <Trips />
  | ["resa", id] => <Trip id />
  | _ => <p> "Blabla"->React.string </p>
  };
};