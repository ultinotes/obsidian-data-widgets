/**
 * Converts a date in the obsidian string format ('yyyy-mm-dd hh:mm') to a Date
 * @param date
 */
export function dateFromString(date: string): Date {
  // try {
  return new Date(date.replace(" ", "T"));
  // } catch (e) {
  // TODO: handle error
  // return undefined;
  // }
}
