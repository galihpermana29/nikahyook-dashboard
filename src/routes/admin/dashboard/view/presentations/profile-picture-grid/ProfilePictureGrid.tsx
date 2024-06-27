const ProfilePictureGrid = ({ data }: { data: string[] }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {data.map((item, index) => (
        <img
          key={index}
          src={item}
          alt={`Profile Picture ${index + 1}`}
          className="size-[96px] object-cover rounded-lg border border-ny-primary-500"
        />
      ))}
    </div>
  );
};

export default ProfilePictureGrid;
