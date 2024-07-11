import { TableProps } from 'antd';
import formatToIDR from './formatToIDR';

function useGenerateTransactionDetailColumn() {
  const columns: TableProps['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product_title',
      key: 'product_title',
      render: (text) => text,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (text?.length > 0 ? text : '-'),
    },
    {
      title: 'Qty',
      dataIndex: '',
      key: 'qty',
      render: ({ quantity, quantity_label }) => `${quantity} ${quantity_label}`,
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
