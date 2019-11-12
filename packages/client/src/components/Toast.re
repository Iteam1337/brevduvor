[@react.component]
let make = () => {
  let (alerts, _) = AlertContext.use();

  let domNode = ReactDOMRe._getElementById("toast");

  domNode
  ->Belt.Option.map(domNode =>
      ReactDOMRe.createPortal(
        <div className="z-50 absolute bottom-4 left-1/2 -translate-x-1/2">
          {Belt.List.toArray(alerts)->React.array}
        </div>,
        domNode,
      )
    )
  ->Belt.Option.getWithDefault(React.null);
};