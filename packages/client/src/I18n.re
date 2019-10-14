module Locale = {
  type t =
    | English
    | Swedish;

  /**
    * language string comes in as e.g. "sv-SE"
    */
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
    | NoDataFromServer
    | CouldNotGetAvailableDestinations
    | NoDroneWithId
    | NoDroneWithIdError
    | FourOFour;

  let _toString = (locale: Locale.t, error) => {
    switch (locale, error) {
    | (English, NoDataFromServer) => "Looks like we did not receive any data from the server."
    | (Swedish, NoDataFromServer) => {js|Det verkar som att vi inte fick tillbaka någon data från servern.|js}

    | (English, FourOFour) => "404. Sorry, the page was not found."
    | (Swedish, FourOFour) => {js|404. Det verkar som att sidan ej kunde hittas. Prova att gå till
    startsidan.|js}

    | (English, CouldNotGetAvailableDestinations) => "Could not fetch available destinations"
    | (Swedish, CouldNotGetAvailableDestinations) => {js|Kunde inte hämta tillgängliga destinationer|js}

    | (English, NoDroneWithId) => "Looks like there's no drone with that id."
    | (Swedish, NoDroneWithId) => {js|Det verkar inte finnas någon drönare med detta id.|js}

    | (English, NoDroneWithIdError) => "Something seems to have gone wrong. Possibly, there's no drone with this id."
    | (Swedish, NoDroneWithIdError) => {js|Någonting verkar ha gått fel. Kanske finns det ingen drönare med detta id.|js}
    };
  };

  /** curried with the "globally" set Locale,
    * currently calls the "Navigator" on every request,
    * this could be set globally instead
     */
  let toString =
    _toString(GlobalWindow.Navigator.language |> Locale.ofString);
};

module Info = {
  type t =
    | NoActiveDrones;

  let _toString = (locale: Locale.t, info) => {
    switch (locale, info) {
    | (English, NoActiveDrones) => "There doesn't seem to be any drones active."
    | (Swedish, NoActiveDrones) => {js|Vi kunde inte hitta några aktiva drönare.|js}
    };
  };

  /** curried with the "globally" set Locale,
    * currently calls the "Navigator" on every request,
    * this could be set globally instead
     */
  let toString =
    _toString(GlobalWindow.Navigator.language |> Locale.ofString);
};
