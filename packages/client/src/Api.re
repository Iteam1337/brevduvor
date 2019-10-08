let url = "https://webhook.site/c97ce874-1749-41f7-95d3-3b1b43bff993";

let saveDestination = (dest: Shared.GeoPosition.t) => {
  Js.log(dest);
  Js.Promise.(
    Fetch.fetchWithInit(url, Fetch.RequestInit.make(~method_=Post, ()))
    |> then_(Fetch.Response.text)
    |> then_(text => Js.log(text) |> resolve)
    |> catch(error => Js.log(error) |> resolve)
  );
};

module Route = {
  type waypoint = {location: array(float)};
  type geometry = {
    coordinates: array(array(float)),
    _type: string,
  };

  type routeDetails = {
    id: string,
    geometry,
    waypoints: array(waypoint),
  };

  open Json.Decode;

  let geometry = json => {
    coordinates:
      json |> field("coordinates", array(array(Json.Decode.float))),
    _type: json |> field("type", string),
  };

  let waypoint = json => {
    location: json |> field("location", array(Json.Decode.float)),
  };

  let routeDetailFromJson = json => {
    id: json |> field("id", Json.Decode.string),
    geometry:
      json
      |> withDefault(
           {coordinates: [||], _type: "LineString"},
           field("geometry", geometry),
         ),
    waypoints:
      json |> withDefault([||], field("waypoints", array(waypoint))),
  };
};