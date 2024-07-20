import { TableProps } from 'antd';

const useGenerateColumnReview = () => {
  const columns: TableProps['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '10%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
      render: (text) => <a className="capitalize">{text}</a>,
    },
  ];

  return { columns };
};

export default useGenerateColumnReview;
