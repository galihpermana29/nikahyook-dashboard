import React from 'react';

type IDashboardCard = {
  title: string;
  actionComponent: React.ReactNode;
  children: React.ReactNode;
  span?: number;
};

const DashboardCard = ({
  title,
  actionComponent,
  children,
  span = 1,
}: IDashboardCard) => {
  const gridSpan = `col-span-${span}`;
  return (
    <div
      className={`p-5 rounded-lg w-full space-y-5 text-black ${gridSpan} row-span-1 border border-ny-gray-100`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-body-1 font-medium">{title}</h2>
        {actionComponent}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
