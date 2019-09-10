type destinations = [ | `Storuman | `Slussfors | `Kvikkjokk];

type t = {
  alias: destinations,
  lat: float,
  lon: float,
};

let toString =
  fun
  | `Storuman => "Storuman"
  | `Slussfors => "Slussfors"
  | `Kvikkjokk => "Kvikkjokk";

let storuman = {alias: `Storuman, lat: 65.090833, lon: 17.1075};
let kvikkjokk = {alias: `Kvikkjokk, lat: 66.9501067, lon: 17.708610};
let slussfors = {alias: `Slussfors, lat: 65.4308046, lon: 16.2481741};