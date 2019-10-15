module Text = {
  [@react.component]
  let make =
      (
        ~inputRef=React.useRef(Js.Nullable.null)->ReactDOMRe.Ref.domRef,
        ~onChange=?,
        ~placeholder,
        ~id,
        ~label,
        ~type_="text",
      ) => {
    <div className="mb-4">
      <label htmlFor=id className="block text-gray-700 text-sm font-bold mb-2">
        label->React.string
      </label>
      <input
        onChange={Utils.invokeIfSet(~callback=onChange)}
        ref=inputRef
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id
        placeholder
        type_
      />
    </div>;
  };
};

module GeoSelect = {
  [@react.component]
  let make =
      (~selectOptions: list(Shared.GeoPosition.t), ~onChange, ~name, ~label) => {
    <>
      <label htmlFor=name className="mt-4 mb-1"> label->React.string </label>
      <div className="inline-block relative w-full">
        <select
          name
          id=name
          onChange={event => {
            let selectedDestination =
              selectOptions->Belt.List.get(
                ReactEvent.Form.target(event)##value->int_of_string,
              );

            switch (selectedDestination) {
            | Some(destination) => onChange(destination)
            | None => ()
            };
          }}
          className="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option label={js|Välj alternativ|js} />
          {selectOptions
           ->Belt.List.mapWithIndex((index, dest) =>
               <option
                 value={string_of_int(index)}
                 key={string_of_int(index) ++ "_" ++ dest.alias}>
                 dest.alias->React.string
               </option>
             )
           ->Belt.List.toArray
           ->React.array}
        </select>
        <div
          className="pointer-events-none
      absolute inset-y-0
      right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </>;
  };
};