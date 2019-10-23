[@react.component]
let make = () => {
  let ({translationsToString, _}, changeLocale): LocaleContext.t =
    LocaleContext.use();

  <div className="flex w-screen h-screen justify-center items-center">
    <div>
      <LanguageSelect
        languages=I18n.Locale.allLanguages
        onChange={language => changeLocale(SetLocale(language))}
        name="languageSelect"
      />
      <Button.Primary
        className="mt-4 bg-green-400"
        onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        {translationsToString(BookTrip_Button)->React.string}
      </Button.Primary>
    </div>
  </div>;
};