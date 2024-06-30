export const yearsOfExperience = (date: string): string =>
  String(Number(new Date().getFullYear()) - Number(date));
