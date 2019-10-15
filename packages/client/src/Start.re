[@react.component]
let make = () =>
  <div className="w-full min-h-screen flex">
    <SideMenu>
      <Button.Primary onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        I18n.Translations.(toString(BookTrip_Button))->React.string
      </Button.Primary>
    </SideMenu>
  </div>;