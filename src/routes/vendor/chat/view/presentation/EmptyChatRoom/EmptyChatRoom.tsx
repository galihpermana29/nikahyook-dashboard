import { Divider } from 'antd';

export default function EmptyChatRoom() {
  return (
    <div className="w-full px-5 min-h-screen relative flex flex-col">
      <h1 className="text-body-1 font-bold">No chat room selected</h1>
      <h2 className="text-caption-2">Selected chat will be displayed here.</h2>

      <Divider />
    </div>
  );
}
