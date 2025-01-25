const pad = (v: number) => v.toString().padStart(2, '0');

const fromDate = (d: Date) => {
  const month = pad(d.getMonth() + 1);
  const date = pad(d.getDate());

  return `${d.getFullYear()}-${month}-${date}`;
};

export const createDateOnly = () => fromDate(new Date());

export const parseDateOnly = (maybeDateOnly: Date | string) => {
  const d = new Date(maybeDateOnly || '');

  if (isNaN(d.getTime())) {
    return undefined;
  }

  return fromDate(d);
};
