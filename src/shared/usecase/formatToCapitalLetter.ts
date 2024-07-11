export default (text: string) => {
  const textArr = text.split(' ');

  const newTextArr = textArr.map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  });

  return newTextArr.join(' ');
};
