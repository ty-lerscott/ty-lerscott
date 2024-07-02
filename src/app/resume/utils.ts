export const yearsOfExperience = (date: string): number =>
  Number(new Date().getFullYear()) - Number(date);
