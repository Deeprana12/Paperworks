import React from 'react';

const ShimmePdf = () => {
  return (
    <div className="h-full flex flex-col items-start justify-start">
      <div className="animate-pulse bg-gray-200 rounded-lg p-4 mb-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
      </div>
      <div className="animate-pulse bg-gray-200 rounded-lg p-4">
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmePdf;
