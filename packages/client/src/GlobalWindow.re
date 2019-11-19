module Navigator = {
  [@bs.deriving abstract]
  type geoOptions = {enableHighAccuracy: bool};
  [@bs.deriving {jsConverter: newType}]
  type coordinates = {
    latitude: float,
    longitude: float,
  };
  [@bs.deriving jsConverter]
  type position = {
    coords: abs_coordinates,
    timestamp: int,
  };
  [@bs.scope ("navigator", "geolocation")] [@bs.val]
  external _getCurrentPosition:
    (Js.t('a) => unit, Js.t('error) => unit, geoOptions) => unit =
    "getCurrentPosition";
  let getCurrentPosition = cb => {
    _getCurrentPosition(
      pos => {
        let positionAsRecord = positionFromJs(pos);
        let coords = coordinatesFromJs(positionAsRecord.coords);
        cb(coords);
      },
      Js.log2("Navigator.GeoLocation"), /* TODO: error logging service */
      geoOptions(~enableHighAccuracy=true),
    );
  };

  [@bs.scope "navigator"] [@bs.val] external language: string = "language";
};

module Document = {
  type document;
  [@bs.val] external doc: document = "document";

  /* body */
  [@bs.scope "document"] [@bs.val] external body: Dom.element = "body";

  /* create element */
  [@bs.send]
  external _createElement: (document, string) => Dom.element = "createElement";

  let createElement = _createElement(doc);

  /* append node */
  [@bs.send]
  external _appendChild: (Dom.element, Dom.element) => Dom.element =
    "appendChild";

  let appendChild = _appendChild;

  /* set attribute */
  [@bs.send]
  external setAttribute: (Dom.element, string, string) => Dom.element =
    "setAttribute";

  /* remove */
  [@bs.send] external remove: Dom.element => unit = "remove";
};