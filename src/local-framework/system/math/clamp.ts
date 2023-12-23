export const clamp = (val: number, minVal: number, maxVal: number) => {
  return Math.min(Math.max(val, minVal), maxVal);
};
