[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  switch (url.path) {
  | [] => <Start />
  | ["boka-resa"] => <Book />
  | ["resor"] => <Trips />
  | ["resa", id] => <Trip id />
  | _ => <p> "404. Not found"->React.string </p>
  };
};
