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

/* saveDestination(Destination.kvikkjokk); */