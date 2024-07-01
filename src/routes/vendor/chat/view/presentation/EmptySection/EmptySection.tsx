import { Empty } from 'antd';

function EmptySection({ message }: { message: string }) {
  return (
    <div className="size-full flex flex-col justify-center gap-5 items-center py-10">
      <Empty className="size-full flex flex-col" description={message} />
    </div>
  );
}

export default EmptySection;
