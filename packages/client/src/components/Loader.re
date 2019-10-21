/**

  Loader with delay. Prevent loading states from flashing up on the screen when the user has a
  fast connection or the operation completes very fast. Specify a timeout with delayMs, default is set to 300ms

   Usage:

   <Loader.Inline isLoading=true|false />

   <Loader.Container isLoading=true|false>
     "Some data"->React.string
   </Loader.Container>

 */
module Inline = {
  [@react.component]
  let make = (~delayMs=300, ~isLoading: bool) => {
    let ({translationsToString}, _): LocaleContext.t = LocaleContext.use();
    let (show, setShow) = React.useState(() => false);

    React.useEffect2(
      () =>
        isLoading
          ? {
            let interval =
              Js.Global.setInterval(() => setShow(_ => true), delayMs);

            Some(() => Js.Global.clearInterval(interval));
          }
          : {
            setShow(_ => false);
            None;
          },
      (delayMs, isLoading),
    );

    show && isLoading
      ? translationsToString(UI_Loading)->React.string : ReasonReact.null;
  };
};

module Container = {
  [@react.component]
  let make = (~delayMs=300, ~isLoading: bool, ~children) => {
    let ({translationsToString}, _): LocaleContext.t = LocaleContext.use();
    let (show, setShow) = React.useState(() => false);

    React.useEffect2(
      () =>
        isLoading
          ? {
            let interval =
              Js.Global.setInterval(() => setShow(_ => true), delayMs);

            Some(() => Js.Global.clearInterval(interval));
          }
          : {
            setShow(_ => false);
            None;
          },
      (delayMs, isLoading),
    );

    show && isLoading
      ? translationsToString(UI_Loading)->React.string : children;
  };
};
