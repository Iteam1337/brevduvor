module Locale = {
  type t = [ | `ENGLISH | `SWEDISH];

  let allLanguages = [`ENGLISH, `SWEDISH];

  let toString =
    fun
    | `ENGLISH => "English"
    | `SWEDISH => "Svenska";

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
    | "sv" => `SWEDISH
    | _ => `ENGLISH
    };
  };
};

module Error = {
  type t =
    | CouldNotGetAvailableDestinations
    | ErrorBookingDrone
    | FourOFour
    | MissingUser
    | NoDataFromServer
    | NoDroneData
    | NoDroneWithId
    | NoDroneWithIdError
    | PassIncorrect
    | PasswordFieldsNotMatching
    | Other(string);

  let authErrorFromSignature =
    /*** Matches error messages from API to translations,
     * included with "GraphQL error:" because no way to strip
     * from apollo error messages without external lib.
     */
    fun
    | "GraphQL error: AuthMissingUser" => MissingUser
    | "GraphQL error: AuthPassIncorrect" => PassIncorrect
    | "GraphQL error: AuthPasswordFieldsNotMatching" =>
      PasswordFieldsNotMatching
    | other => other->Other;

  let _toString = (locale: Locale.t, error) => {
    switch (locale, error) {
    | (`ENGLISH, NoDataFromServer) => "Looks like we did not receive any data from the server."
    | (`SWEDISH, NoDataFromServer) => {js|Det verkar som att vi inte fick tillbaka någon data från servern.|js}

    | (`ENGLISH, ErrorBookingDrone) => "There was an error while trying to start the drone."
    | (`SWEDISH, ErrorBookingDrone) => {js|Någonting gick snett drönaren försökte startas|js}

    | (`ENGLISH, FourOFour) => "404. Sorry, the page was not found."
    | (`SWEDISH, FourOFour) => {js|404. Det verkar som att sidan ej kunde hittas. Prova att gå till
    startsidan.|js}

    | (`ENGLISH, CouldNotGetAvailableDestinations) => "Could not fetch available destinations"
    | (`SWEDISH, CouldNotGetAvailableDestinations) => {js|Kunde inte hämta tillgängliga destinationer|js}

    | (`ENGLISH, NoDroneWithId) => "Looks like there's no drone with that id."
    | (`SWEDISH, NoDroneWithId) => {js|Det verkar inte finnas någon drönare med detta id.|js}

    | (`ENGLISH, NoDroneWithIdError) => "Something seems to have gone wrong. Possibly, there's no drone with this id."
    | (`SWEDISH, NoDroneWithIdError) => {js|Någonting verkar ha gått fel. Kanske finns det ingen drönare med detta id.|js}

    | (`ENGLISH, MissingUser) => "There is no user associated with that email."
    | (`SWEDISH, MissingUser) => {js|Det finns ingen användare associerat med denna email.|js}

    | (`ENGLISH, PasswordFieldsNotMatching) => "Password fields do not match."
    | (`SWEDISH, PasswordFieldsNotMatching) => {js|Lösenorden matchar inte.|js}

    | (`ENGLISH, PassIncorrect) => "Incorrect password."
    | (`SWEDISH, PassIncorrect) => {js|Fel lösenord.|js}

    | (`ENGLISH, NoDroneData) => "Something seems to have gone wrong. No drone-data was received."
    | (`SWEDISH, NoDroneData) => {js|Det verkar som att någonting gick fel. Ingen drönardata
       kunde hämtas|js}

    | (_, Other(msg)) => msg
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
    | (`ENGLISH, NoActiveDrones) => "There doesn't seem to be any drones active."
    | (`SWEDISH, NoActiveDrones) => {js|Vi kunde inte hitta några aktiva drönare.|js}
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
    | BookTrip_From_Label
    | BookTrip_To_Label
    | BookTrip_PrepareTrip_Button
    | BookTrip_TripPrepared_Message
    | BookTrip_GoToOverview_Button
    | BookTrip_Booking_Finished
    | GeoLocation_Latitude
    | GeoLocation_Longitude
    | DroneStatus_Loading_Position
    | Language_Choose_DropdownLabel;

  let _toString = (locale: Locale.t, translations) => {
    switch (locale, translations) {
    | (`ENGLISH, UI_Loading) => "Loading"
    | (`SWEDISH, UI_Loading) => {js|Laddar|js}

    | (`ENGLISH, BookTrip_Booking_Finished) => "Your drone is now booked and has started its trip."
    | (`SWEDISH, BookTrip_Booking_Finished) => {js|Din drönare har nu bokats och påbörjat sin resa.|js}

    | (`ENGLISH, Auth_Email_Label) => "Email"
    | (`SWEDISH, Auth_Email_Label) => {js|E-post|js}

    | (`ENGLISH, Auth_Email_Placeholder) => "my@email.com"
    | (`SWEDISH, Auth_Email_Placeholder) => {js|min@epost.se|js}

    | (`ENGLISH, Auth_Username_Label) => "Username"
    | (`SWEDISH, Auth_Username_Label) => {js|Användarnamn|js}

    | (`ENGLISH, Auth_Username_Placeholder) => "Username"
    | (`SWEDISH, Auth_Username_Placeholder) => {js|Användarnamn|js}

    | (`ENGLISH, Auth_Password_Label) => "Password"
    | (`SWEDISH, Auth_Password_Label) => {js|Lösenord|js}

    | (_, Auth_Password_Placeholder) => "********"

    | (`ENGLISH, Auth_Login_Submit) => "Login"
    | (`SWEDISH, Auth_Login_Submit) => {js|Logga in|js}

    | (`ENGLISH, BookTrip_Button) => "Book trip"
    | (`SWEDISH, BookTrip_Button) => {js|Boka resa|js}

    | (`ENGLISH, BookTrip_Choose_DropdownLabel) => "Select option"
    | (`SWEDISH, BookTrip_Choose_DropdownLabel) => {js|Välj alternativ|js}

    | (`ENGLISH, BookTrip_From_Label) => "From"
    | (`SWEDISH, BookTrip_From_Label) => {js|Från|js}

    | (`ENGLISH, BookTrip_To_Label) => "To"
    | (`SWEDISH, BookTrip_To_Label) => {js|Till|js}

    | (`ENGLISH, GeoLocation_Latitude) => "Latitude"
    | (`SWEDISH, GeoLocation_Latitude) => "Latitud"

    | (`ENGLISH, GeoLocation_Longitude) => "Longitude"
    | (`SWEDISH, GeoLocation_Longitude) => "Longitud"

    | (`ENGLISH, BookTrip_PrepareTrip_Button) => "Prepare trip"
    | (`SWEDISH, BookTrip_PrepareTrip_Button) => {js|Förbered bokning|js}

    | (`ENGLISH, BookTrip_TripPrepared_Message) => "This trip has been prepared. You will get a notification when the drone is ready to be loaded"
    | (`SWEDISH, BookTrip_TripPrepared_Message) => {js|Du har nu förberett din bokning. Vi notifierar dig när det är dags att packa drönaren.|js}

    | (`ENGLISH, BookTrip_GoToOverview_Button) => {js|Go to overview|js}
    | (`SWEDISH, BookTrip_GoToOverview_Button) => {js|Gå till överblick|js}

    | (`ENGLISH, DroneStatus_Loading_Position) => "Fetching the drones position"
    | (`SWEDISH, DroneStatus_Loading_Position) => {js|Laddar drönares position.|js}

    | (`ENGLISH, Language_Choose_DropdownLabel) => "Select language"
    | (`SWEDISH, Language_Choose_DropdownLabel) => {js|Välj språk|js}
    };
  };

  let toString =
    _toString(GlobalWindow.Navigator.language |> Locale.ofString);
};
