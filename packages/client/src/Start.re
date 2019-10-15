[@react.component]
let make = () =>
  <SideMenu>
    <div>
      <Button.Primary
        className="mt-4"
        onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        I18n.Translations.(toString(BookTrip_Button))->React.string
      </Button.Primary>
    </div>
  </SideMenu>;