export const generateRandomPage = () => {
  return Math.round(Math.random() * 149 + 1);
};

export function filterArray<T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean,
): T[] {
  const filtered = arr.filter(callback);
  return filtered;
}
