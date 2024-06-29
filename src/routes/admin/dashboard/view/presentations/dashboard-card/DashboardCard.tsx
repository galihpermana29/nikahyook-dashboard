import React from 'react';

type IDashboardCard = {
  title: string;
  actionComponent: React.ReactNode;
  children: React.ReactNode;
  size?: 'large' | 'normal'
};

const DashboardCard = ({
  title,
  actionComponent,
  children,
  size = 'normal'
}: IDashboardCard) => {
  return (
    <div
      className={`${size === 'normal' ? 'col-span-1' : 'col-span-2' } p-5 rounded-lg w-full space-y-5 text-black row-span-1 border border-ny-gray-100`}
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
