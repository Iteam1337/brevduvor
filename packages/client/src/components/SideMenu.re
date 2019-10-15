[@react.component]
let make = (~children) => {
  <div className="w-3/12 bg-white flex flex-row shadow-lg z-10">
    <div className="py-6 px-4 bg-blue-400">
      <div className="w-full flex flex-col justify-center">
        <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
      </div>
    </div>
    <div className="p-5">
    children
    </div>
  </div>;
};