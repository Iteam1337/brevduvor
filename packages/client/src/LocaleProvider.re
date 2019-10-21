let make = React.Context.provider(LocaleContext.context);

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};
