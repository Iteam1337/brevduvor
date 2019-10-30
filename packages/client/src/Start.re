[@react.component]
let make = () => {
  let ({translationsToString, _}, changeLocale): LocaleContext.t =
    LocaleContext.use();

  <div className="w-full min-h-screen flex">
    <SideMenu>
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
    </SideMenu>
  </div>;
};