module Position = {
  [@react.component]
  let make = (~longitude, ~latitude) => {
    let shadow = `rgba((43, 108, 176, 100.0));
    let x = `zero;
    let y = `zero;

    let initialShadow =
      Css.(boxShadow(Shadow.box(~x, ~y, ~blur=`px(8), shadow)));

    let pulse =
      Css.(
        keyframes([
          (0, [initialShadow]),
          (50, [boxShadow(Shadow.box(~x, ~y, ~blur=`px(16), shadow))]),
          (100, [initialShadow]),
        ])
      );

    let className =
      Css.(
        merge([
          "rounded-full bg-blue-400 w-5 h-5 border-white",
          style([
            animationName(pulse),
            animationDuration(2000),
            animationIterationCount(`infinite),
            borderWidth(`px(3)),
            initialShadow,
          ]),
        ])
      );

    <ReactMapGl.Marker longitude latitude>
      <div className />
    </ReactMapGl.Marker>;
  };
};

module Destination = {
  [@react.component]
  let make = (~longitude, ~latitude) => {
    <ReactMapGl.Marker longitude latitude>
      <Icon name=`Marker className="text-red-600 w-6 h-6 mb-6" />
    </ReactMapGl.Marker>;
  };
};