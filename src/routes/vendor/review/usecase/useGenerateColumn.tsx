import { TableProps } from 'antd';

const useGenerateColumnReview = () => {
  const columns: TableProps['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: (text) => <a className="capitalize">{text}</a>,
    },
  ];

  return { columns };
};

export default useGenerateColumnReview;
