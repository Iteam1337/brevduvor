[@react.component]
let make = (~children) => {
  <div className="w-full min-h-screen flex bg-background">
    <div
      className="w-3/12 min-h-screen p-5 bg-white h-full flex flex-col shadow-md">
      children
    </div>
  </div>;
};