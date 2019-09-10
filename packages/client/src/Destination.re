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

let storuman = {alias: `Storuman, lat: 123., lon: 123.};
let kvikkjokk = {alias: `Kvikkjokk, lat: 123., lon: 123.};
let slussfors = {alias: `Slussfors, lat: 123., lon: 123.};
