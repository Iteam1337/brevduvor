let invokeIfSet = (~callback, data) =>
  switch (callback) {
  | Some(cb) => cb(data)
  | None => ()
  };

let orEmptyString = v => v->Belt.Option.getWithDefault("");
