
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 shimmer rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-100 shimmer rounded"></div>
          <div className="h-6 w-1/4 bg-gray-100 shimmer rounded"></div>
          <div className="h-4 w-full bg-gray-100 shimmer rounded"></div>
          <div className="h-4 w-full bg-gray-100 shimmer rounded"></div>
          <div className="h-4 w-3/4 bg-gray-100 shimmer rounded"></div>
          <div className="h-10 w-1/3 bg-gray-100 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
