[@react.component]
let make = () => {
  let ({translationsToString, _}, _changeLocale): LocaleContext.t =
    LocaleContext.use();

  <div className="flex w-screen h-screen justify-center items-center">
    <div>
      <Button.Primary
        className="mt-4 bg-green-400"
        onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        {translationsToString(BookTrip_Button)->React.string}
      </Button.Primary>
    </div>
  </div>;
};
