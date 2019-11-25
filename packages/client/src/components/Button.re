module Primary = {
  [@react.component]
  let make = (~children, ~type_="button", ~className=?, ~onClick=?) => {
    let ({translationsToString, _}, _changeLocale): LocaleContext.t =
      LocaleContext.use();

    let base = "w-full text-xs bg-blue-400 hover:bg-blue-500 text-white font-semibold
        py-3 px-4 rounded tracking-wide border border-blue-400 hover:border-blue-500 mt-5";

    let className = Cn.make([base, className->Cn.unpack]);

    <button className type_ ?onClick>
      {{translationsToString(children)}->React.string}
    </button>;
  };
};

module Secondary = {
  [@react.component]
  let make =
      (~children, ~type_="button", ~onClick=?, ~disabled=false, ~className=?) => {
    let base = "w-full text-xs text-white font-semibold
        py-3 px-4 rounded tracking-wide mt-5";

    let className =
      Cn.make([
        base,
        className->Cn.unpack,
        switch (disabled) {
        | false => "border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-600 text-white hover:text-blue-600"
        | true => "bg-gray-400 text-white focus:outline-none"
        },
      ]);

    <button className ?onClick type_> children </button>;
  };
};
