module P = {
  [@react.component]
  let make = (~children, ~className=?) => {
    let base = "";

    let className = Cn.make([base, className->Cn.unpack]);
    <p className> children->React.string </p>;
  };
};

module Error = {
  [@react.component]
  let make = (~children: I18n.Error.t) => {
    let ({errorToString}, _changeLocale): LocaleContext.t =
      LocaleContext.use();

    <p className="text-red"> {{errorToString(children)}->React.string} </p>;
  };
};
