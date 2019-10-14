let use = () => {
  let usernameInputRef = React.useRef(Js.Nullable.null);

  React.useEffect1(
    () => {
      usernameInputRef
      ->React.Ref.current
      ->Js.Nullable.toOption
      ->Belt.Option.map(el => el->ReactDOMRe.domElementToObj##focus())
      ->ignore;

      None;
    },
    [|usernameInputRef|],
  );

  ReactDOMRe.Ref.domRef(usernameInputRef);
};