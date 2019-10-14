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
    | "sv" => Swedish
    | _ => English
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

module Translations = {
  type t =
    | UI_Loading
    | Auth_Email_Label
    | Auth_Email_Placeholder
    | Auth_Username_Label
    | Auth_Username_Placeholder
    | Auth_Password_Label
    | Auth_Password_Placeholder
    | Auth_Login_Submit
    | BookTrip_Button
    | BookTrip_Choose_DropdownLabel
    | BookTrip_From_DropdownLabel
    | BookTrip_To_DropdownLabel
    | BookTrip_PrepareTrip_Button
    | BookTrip_TripPrepared_Message
    | BookTrip_GoToOverview_Button;

  let _toString = (locale: Locale.t, translations) => {
    switch (locale, translations) {
    | (English, UI_Loading) => "Loading"
    | (Swedish, UI_Loading) => {js|Laddar|js}

    | (English, Auth_Email_Label) => "Email"
    | (Swedish, Auth_Email_Label) => {js|E-post|js}

    | (English, Auth_Email_Placeholder) => "my@email.com"
    | (Swedish, Auth_Email_Placeholder) => {js|min@epost.se|js}

    | (English, Auth_Username_Label) => "Username"
    | (Swedish, Auth_Username_Label) => {js|Användarnamn|js}

    | (English, Auth_Username_Placeholder) => "Username"
    | (Swedish, Auth_Username_Placeholder) => {js|Användarnamn|js}

    | (English, Auth_Password_Label) => "Password"
    | (Swedish, Auth_Password_Label) => {js|Lösenord|js}

    | (_, Auth_Password_Placeholder) => "****"

    | (English, Auth_Login_Submit) => "Login"
    | (Swedish, Auth_Login_Submit) => {js|Logga in|js}

    | (English, BookTrip_Button) => "Book trip"
    | (Swedish, BookTrip_Button) => {js|Boka resa|js}

    | (English, BookTrip_Choose_DropdownLabel) => "Choose option"
    | (Swedish, BookTrip_Choose_DropdownLabel) => {js|Välj alternativ|js}

    | (English, BookTrip_From_DropdownLabel) => "From"
    | (Swedish, BookTrip_From_DropdownLabel) => {js|Från|js}

    | (English, BookTrip_To_DropdownLabel) => "To"
    | (Swedish, BookTrip_To_DropdownLabel) => {js|Till|js}

    | (English, BookTrip_PrepareTrip_Button) => "Prepare trip"
    | (Swedish, BookTrip_PrepareTrip_Button) => {js|Förbered bokning|js}

    | (English, BookTrip_TripPrepared_Message) => "This trip has been prepared. You will get a notification when the drone is ready to be loaded"
    | (Swedish, BookTrip_TripPrepared_Message) => {js|Du har nu förberett din bokning. Vi notifierar dig när det är dags att packa drönaren.|js}

    | (English, BookTrip_GoToOverview_Button) => {js|Go to overview|js}
    | (Swedish, BookTrip_GoToOverview_Button) => {js|Gå till överblick|js}
    };
  };

  let toString = _toString(Locale.English);
};