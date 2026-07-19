export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function dateFromParts(year: number, month: number, day: number) {
  return new Date(year, month, day);
}

export function isValidDate(year: number, month: number, day: number) {
  const date = dateFromParts(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export function differenceInCalendarDays(first: Date, second: Date) {
  const firstUtc = Date.UTC(first.getFullYear(), first.getMonth(), first.getDate());
  const secondUtc = Date.UTC(second.getFullYear(), second.getMonth(), second.getDate());
  return Math.round((firstUtc - secondUtc) / MILLISECONDS_PER_DAY);
}
