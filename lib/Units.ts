const millisInSec = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;

export const Millisecond = {
  toMillis: (value: number) => value,
  fromMillis: (value: number) => value,
} as const;

export const Second = {
  toMillis: (value: number) => value * millisInSec,
  fromMillis: (value: number) => value / millisInSec,
} as const;

export const Minute = {
  toMillis: (value: number) => Second.toMillis(value * secondsInMinute),
  fromMillis: (value: number) => Second.fromMillis(value / secondsInMinute),
} as const;

export const Hour = {
  toMillis: (value: number) => Minute.toMillis(value * minutesInHour),
  fromMillis: (value: number) => Minute.fromMillis(value / minutesInHour),
} as const;

export const Day = {
  toMillis: (value: number) => Hour.toMillis(value * hoursInDay),
  fromMillis: (value: number) => Hour.fromMillis(value / hoursInDay),
} as const;
