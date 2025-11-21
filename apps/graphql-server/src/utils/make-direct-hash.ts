export const makeDirectHash = (a: string, b: string) => {
  const s = [a, b].sort();
  return s.join(':');
};
