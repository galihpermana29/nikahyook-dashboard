import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonInput from 'antd/es/skeleton/Input';

export default function SendChatAreaLoading() {
  return (
    <div className="w-full flex items-center gap-5">
      <SkeletonInput active block className="w-full" />
      <SkeletonButton active />
    </div>
  );
}
