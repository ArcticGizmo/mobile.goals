const pad = (v: number) => v.toString().padStart(2, '0');

export const createDateOnly = () => {
  const d = new Date();

  const month = pad(d.getMonth() + 1);
  const date = pad(d.getDate());

  return `${d.getFullYear()}-${month}-${date}`;
};
