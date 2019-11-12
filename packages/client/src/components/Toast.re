module Container = {
  [@react.component]
  let make = () => {
    let domNode = ReactDOMRe._getElementById("toast");

    domNode
    ->Belt.Option.map(domNode =>
        ReactDOMRe.createPortal(<Notifications />, domNode)
      )
    ->Belt.Option.getWithDefault(React.null);
  };
} /*let make(React.null, ~timeout: 4000, ~dismissable)*/;
