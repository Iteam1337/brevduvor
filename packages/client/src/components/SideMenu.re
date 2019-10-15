[@react.component]
let make = (~children) => {
  <div className="min-w-350 w-350 bg-white flex flex-row shadow-lg z-10">
    <div className="py-6 px-4 bg-blue-400">
      <div className="w-full flex flex-col justify-center">
        <Icon name=`Dashboard className="text-gray-100 w-6 h-6 mb-6" />
      </div>
    </div>
    <div className="p-5 w-full"> children </div>
  </div>;
};