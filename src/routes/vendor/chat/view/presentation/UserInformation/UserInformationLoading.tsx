import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import SkeletonInput from 'antd/es/skeleton/Input';

const UserInformationLoading = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  classname?: string;
  fullscreen?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 w-full">
        <SkeletonAvatar size="large" className="size-14" active />

        <div className="flex flex-col gap-[2px] w-full max-w-96">
          <SkeletonInput active block />
          <SkeletonInput active block />
        </div>
      </div>
    );
  }

  return children;
};

export default UserInformationLoading;
