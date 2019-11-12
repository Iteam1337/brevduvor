let make = React.Context.provider(AlertContext.context);

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};