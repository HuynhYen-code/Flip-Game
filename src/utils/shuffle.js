export const shuffle = arr =>
  arr.map(v => ({ v, r: Math.random() }))
     .sort((a, b) => a.r - b.r)
     .map(({ v }) => v);
