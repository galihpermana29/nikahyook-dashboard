import { Spin } from 'antd';

function TransactionLoading() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Spin />
    </div>
  );
}

export default TransactionLoading;
