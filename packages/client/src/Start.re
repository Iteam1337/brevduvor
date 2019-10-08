[@react.component]
let make = () =>
  <div className="flex w-screen h-screen justify-center items-center">
    <div>
      <Button.Primary
        className="mt-4 bg-green-400"
        onClick={_ => ReasonReactRouter.push("/boka-resa")}>
        {js| Boka resa |js}->React.string
      </Button.Primary>
    </div>
  </div>;