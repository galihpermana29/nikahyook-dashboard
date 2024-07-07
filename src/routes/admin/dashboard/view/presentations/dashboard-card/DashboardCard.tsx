import React from 'react';

type IDashboardCard = {
  title: string;
  actionComponent: React.ReactNode;
  children: React.ReactNode;
  size?: 'large' | 'normal';
  responsive?: boolean;
};

const DashboardCard = ({
  title,
  actionComponent,
  children,
  size = 'normal',
  responsive = false
}: IDashboardCard) => {
  return (
    <div
      className={`${size === 'normal' ? 'col-span-3 sm:col-span-1' : 'col-span-3 sm:col-span-2' } p-5 rounded-lg w-full space-y-5 text-black row-span-1 border border-ny-gray-100`}
    >
      <div className={`${ responsive ? 'flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center' : 'justify-between'} flex  `}>
        <h2 className={`${responsive ? 'mb-2 sm:mb-0' : ''} text-body-1 font-medium`}>{title}</h2>
        {actionComponent}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
