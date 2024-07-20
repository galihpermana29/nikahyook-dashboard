import { Metadata } from '@/shared/models/generalInterfaces';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactNode } from 'react';
import DashboardTableFooter from './DashboardTableFooter';

interface IDashboardTable {
  columns: ColumnsType<any>;
  metadata?: Metadata;
  onPaginationChanges: React.Dispatch<
    React.SetStateAction<{
      limit?: number;
      page?: number;
      search?: string;
    }>
  > | null;
  loading?: boolean;
  filterComponents: ReactNode;
}

interface DashboardTableProps<T> extends IDashboardTable {
  data?: T[]; // Make the data prop dynamic
}

const DashboardTable = <T extends object>({
  columns,
  data,
  metadata,
  onPaginationChanges,
  loading,
  filterComponents,
}: DashboardTableProps<T>) => {

  const customPaginationProps = {
    total: metadata?.total_items ?? 0,
    pageSize: metadata?.limit ?? 10,
    onChange: (page: number) => {
      onPaginationChanges?.((state) => ({ ...state, page }));
    },
    current: metadata?.current_page ?? 1,
  }

  return (
    <div>
      <div className="mb-[20px]">{filterComponents}</div>
      <div>
        <Table
          scroll={{ x: 'max-content' }}
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={onPaginationChanges ? false : undefined}
          footer={
            onPaginationChanges
              ? () => (
                <DashboardTableFooter
                  paginationProps={customPaginationProps!}
                  metadata={metadata}
                />
              )
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default DashboardTable;
