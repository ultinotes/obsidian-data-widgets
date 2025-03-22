import type { RRule } from "rrule";
import type { CalendarEvent } from "../../components/src/calendar/common";

export function getOccurencesBetween(
  schedule: RRule,
  occurences: CalendarEvent[],
  isDynamic: boolean,
  start: Date,
  end: Date
) {
  let offsetSchedule = schedule.clone();
  const lastOccurence = occurences.last();
  if (isDynamic && lastOccurence) {
    // schift schedule to account for offset of dynamic last occurence
    offsetSchedule.options.dtstart = lastOccurence.start;
  }
  return offsetSchedule.between(start, end, true);
}
