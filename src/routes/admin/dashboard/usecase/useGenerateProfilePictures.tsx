const useGenerateProfilePictures = (count: number): string[] => {
  const urls = [
    'https://res.cloudinary.com/dcvnwpyd9/image/upload/v1718201169/nikahyook/ru9g0f6d57qjcgfr3cr8.png',
    'https://res.cloudinary.com/dcvnwpyd9/image/upload/v1718201169/nikahyook/ru9g0f6d57qjcgfr3cr8.png',
    'https://res.cloudinary.com/dcvnwpyd9/image/upload/v1718607091/nikahyook/ypnsctvjubybakch0tkv.jpg',
  ];

  const shuffled = Array(count)
    .fill(null)
    .map(() => urls[Math.floor(Math.random() * urls.length)]);
  return shuffled;
};

export default useGenerateProfilePictures;
