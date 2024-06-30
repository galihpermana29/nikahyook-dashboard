import { TableProps } from 'antd';
import formatToIDR from './formatToIDR';

function useGenerateTransactionDetailColumn() {
  const columns: TableProps['columns'] = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text ?? '-',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      render: (text) => text,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatToIDR(text),
    },
  ];

  return { columns };
}

export default useGenerateTransactionDetailColumn;
