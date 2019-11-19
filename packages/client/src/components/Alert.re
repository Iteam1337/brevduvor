let useTimeout = (~timeout, ~onRemove) =>
  React.useEffect2(
    () => {
      let id =
        switch (timeout, onRemove) {
        | (Some(t), Some(fn)) => Some(Js.Global.setTimeout(fn, t))
        | _ => None
        };

      Some(
        () =>
          switch (id) {
          | Some(id) => Js.Global.clearTimeout(id)
          | None => ()
          },
      );
    },
    (timeout, onRemove),
  );

module Error = {
  [@react.component]
  let make =
      (~children: I18n.Error.t, ~heading=?, ~className=?, ~onRemove, ~timeout) => {
    let ({errorToString}, _changeLocale): LocaleContext.t =
      LocaleContext.use();

    useTimeout(~timeout, ~onRemove) |> ignore;

    <div
      className=Cn.(
        make([
          "bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
          unpack(className),
        ])
      )
      role="alert">
      {heading->Belt.Option.mapWithDefault(React.null, heading =>
         <p className="font-bold"> {errorToString(heading)->React.string} </p>
       )}
      <p> {{errorToString(children)}->React.string} </p>
    </div>;
  };
};

module Info = {
  [@react.component]
  let make =
      (
        ~children: I18n.Translations.t,
        ~heading=?,
        ~className=?,
        ~onRemove,
        ~timeout,
      ) => {
    let ({translationsToString}, _changeLocale): LocaleContext.t =
      LocaleContext.use();

    useTimeout(~timeout, ~onRemove) |> ignore;

    <div
      className=Cn.(
        make([
          "bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4",
          unpack(className),
        ])
      )
      role="alert">
      {heading->Belt.Option.mapWithDefault(React.null, heading =>
         <p className="font-bold">
           {translationsToString(heading)->React.string}
         </p>
       )}
      <p> {{translationsToString(children)}->React.string} </p>
    </div>;
  };
};

module Success = {
  [@react.component]
  let make =
      (
        ~children: I18n.Translations.t,
        ~heading=?,
        ~className=?,
        ~onRemove,
        ~timeout,
      ) => {
    let ({translationsToString}, _changeLocale): LocaleContext.t =
      LocaleContext.use();

    useTimeout(~timeout, ~onRemove) |> ignore;

    <div
      className={Cn.make([
        "bg-green-100 border-l-4 border-green-500 text-green-700 p-4",
        Cn.unpack(className),
      ])}
      role="alert">
      {heading->Belt.Option.mapWithDefault(React.null, heading =>
         <p className="font-bold">
           {translationsToString(heading)->React.string}
         </p>
       )}
      <p> {{translationsToString(children)}->React.string} </p>
    </div>;
  };
};