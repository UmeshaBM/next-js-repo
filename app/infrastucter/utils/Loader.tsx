import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-90 z-50">
      <span className="loading loading-lg"></span>
    </div>
  );
};

export default Loader;
