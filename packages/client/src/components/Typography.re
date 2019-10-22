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
  let make = (~children) => {
    <p className="text-red"> children->React.string </p>;
  };
};