import dayjs, { Dayjs } from 'dayjs'

export const isDateWithinMinutes = (a: Dayjs, b: Dayjs, minutesLimit: number) =>
  minutesLimit > a.diff(b, 'minutes')

export const isDueDatePassed = (dueDateMillis: number): boolean => {
  return dayjs().isAfter(dayjs(dueDateMillis))
}
