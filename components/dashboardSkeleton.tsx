import React from 'react';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="p-5">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
      </div>
      <div className="animate-pulse mt-6">
        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-2/4"></div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
