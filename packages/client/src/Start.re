[@react.component]
let make = () =>
  <SideMenu>
    <div>
      <Button.Primary
        className="mt-4"
        onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        "Boka resa"->React.string
      </Button.Primary>
    </div>
  </SideMenu>;