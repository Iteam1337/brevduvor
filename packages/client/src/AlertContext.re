type action =
  | Error(I18n.Error.t)
  | Info(I18n.Translations.t)
  | Clear;

type dispatch = action => unit;

type alert = list(React.element);

type t = (alert, dispatch);

let reducer = (state, action) =>
  switch (action) {
  | Error(error) => [<Alert.Error> error </Alert.Error>, ...state]
  | Info(info) => [<Alert.Info> info </Alert.Info>, ...state]
  | Clear => []
  };

let initialContext: t = ([], _ => ignore());

let context = React.createContext(initialContext);

let use = () => React.useContext(context);