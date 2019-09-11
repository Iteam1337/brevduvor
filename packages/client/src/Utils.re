let invokeIfSet = (~callback, data) =>
  switch (callback) {
  | Some(cb) => cb(data)
  | None => ()
  };

let makeClassName = (~baseClassNames, ~propClassNames) => {
  switch (propClassNames) {
  | None => baseClassNames
  | Some(cn) => baseClassNames ++ " " ++ cn
  };
};