export const puzzleTransform = (data: string): string[] => {
  const dataAsArray = data.toString().split('\r\n');

  return dataAsArray;
};
