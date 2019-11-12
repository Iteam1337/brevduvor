module Container = {
  [@react.component]
  let make = () => {
    let (alerts, dispatch) = AlertContext.use();

    let domNode = ReactDOMRe._getElementById("toast");

    React.useEffect0(() => {
      let interval = Js.Global.setTimeout(() => dispatch(Clear), 3000);
      Some(() => Js.Global.clearTimeout(interval));
    });

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
} /*let make(React.null, ~timeout: 4000, ~dismissable)*/;