let invokeIfSet = (~callback, data) =>
  switch (callback) {
  | Some(cb) => cb(data)
  | None => ()
  };

let mergeClassNames = (classNames: list(string)) => {
  classNames->Belt.List.reduce("", (acc, cns) => acc ++ " " ++ cns);
};

let orEmptyStr = v => v->Belt.Option.getWithDefault("");