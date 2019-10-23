type action =
  | SetLocale(I18n.Locale.t);

type dispatch = action => unit;

type locale = {
  errorToString: I18n.Error.t => string,
  translationsToString: I18n.Translations.t => string,
};

/*
 * our context-value consists of a tuple of the locale-helpers,
 * and a dispatch-function to update
 * the current language
 */
type t = (locale, dispatch);

/* we return the curried _toString-functions with the updated language */
let reducer = (_state, action) =>
  switch (action) {
  | SetLocale(newLanguage) => {
      errorToString: I18n.Error._toString(newLanguage),
      translationsToString: I18n.Translations._toString(newLanguage),
    }
  };

/* initial context */
let initialContext: t = (
  {
    errorToString: I18n.Error._toString(`SWEDISH),
    translationsToString: I18n.Translations._toString(`SWEDISH),
  },
  _ => ignore(),
);

let context = React.createContext(initialContext);

/* the context-hook */
let use = () => React.useContext(context);