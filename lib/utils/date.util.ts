/**
 * Evaluates of date is between dates passed
 * @param currentDate Date to evaluate
 * @param startDate Date that is to be before current date
 * @param endDate Date that is to be after current date
 * @returns Boolean mentioning if date is between other dates
 */
export const isBetweenDates = (currentDate: Date, startDate?: Date, endDate?: Date): boolean => {
  if (!startDate || !endDate) {
    return false
  }
  return new Date(startDate) < currentDate && currentDate < new Date(endDate)
}

/**
 * Returns the hour difference between two dates
 * @param date1 First date to compare
 * @param date2 Second date to compare
 * @returns Hour difference
 */
export const getHourDiff = (date1: Date, date2: Date): number => {
  return Math.abs(date1.getTime() - date2.getTime()) / 36e5
}
