import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import defaultProfilePicture from '@/assets/default-profile-image.png';
import SkeletonInput from 'antd/es/skeleton/Input';

type TChatBubbleSenderInformationProps = {
  senderId: string;
  isFromUser: boolean;
  timestamp: string;
};

export default function ChatBubbleSenderInformation({
  senderId,
  isFromUser,
  timestamp,
}: TChatBubbleSenderInformationProps) {
  const { data, isLoading } = useQueryDetailUser(senderId);
  if (isLoading) return <SkeletonInput active block className="max-w-48 h-8" />;

  const senderName = isFromUser ? 'You' : data?.name;

  return (
    <div
      className={`flex items-center gap-3 ${
        isFromUser ? 'flex-row' : 'flex-row-reverse'
      }`}>
      <span className="text-caption-2 text-ny-gray-400">
        {dayjs(timestamp).format('HH.mm')}
      </span>

      <span className="text-caption-1 font-medium">
        {senderName ?? 'Sender Name'}
      </span>

      <Avatar
        className="size-8"
        src={
          data?.profile_image_uri === ''
            ? defaultProfilePicture
            : data?.profile_image_uri
        }
      />
    </div>
  );
}
