module Locale = {
  type t =
    | English
    | Swedish;

  let ofString = locale => {
    let language =
      Tablecloth.(
        locale
        |> String.split(~on="-")
        |> List.head
        |> Option.withDefault(~default="sv")
      );

    switch (language) {
    | "en" => English
    | _ => Swedish
    };
  };
};

module Error = {
  type t =
    | NoDataFromServer;

  let _toString = (locale: Locale.t, error) => {
    switch (locale, error) {
    | (English, NoDataFromServer) => "Looks like we did not receive any data from the server."
    | (Swedish, NoDataFromServer) => {js|Det verkar som att vi inte fick tillbaka någon data från servern.|js}
    };
  };

  let toString =
    _toString(GlobalWindow.Navigator.language |> Locale.ofString);
};
