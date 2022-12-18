import { Duration } from "./Duration";

const oneMilli = Duration.milliseconds(1);
const oneSec = Duration.seconds(1);
const oneSecMillis = 1000;
const oneMin = Duration.minutes(1);
const oneMinMillis = 60 * oneSecMillis;
const oneHour = Duration.hours(1);
const oneHourMillis = 60 * oneMinMillis;
const oneDay = Duration.days(1);
const oneDayMillis = 24 * oneHourMillis;
const fiveDays = Duration.days(5); // 432000000 millis
const fiveDaysMillis = 432000000;

const epochDate = new Date(0);
const date1 = new Date(fiveDaysMillis);
const date2 = new Date(fiveDaysMillis * 2);

test("add", () => {
  expect(oneMilli.add(fiveDays).millis).toBe(1 + fiveDaysMillis);
  expect(oneSec.add(fiveDays).millis).toBe(oneSecMillis + fiveDaysMillis);
  expect(oneMin.add(fiveDays).millis).toBe(oneMinMillis + fiveDaysMillis);
  expect(oneHour.add(fiveDays).millis).toBe(oneHourMillis + fiveDaysMillis);
  expect(oneDay.add(fiveDays).millis).toBe(oneDayMillis + fiveDaysMillis);

  expect(oneMilli.add(fiveDays).millis).toBe(oneMilli.plus(fiveDays).millis);
});

test("subtract", () => {
  expect(fiveDays.subtract(oneMilli).millis).toBe(fiveDaysMillis - 1);
  expect(fiveDays.subtract(oneSec).millis).toBe(fiveDaysMillis - 1000);
  expect(fiveDays.subtract(oneMin).millis).toBe(fiveDaysMillis - 60000);
  expect(fiveDays.subtract(oneHour).millis).toBe(fiveDaysMillis - 3600000);
  expect(fiveDays.subtract(oneDay).millis).toBe(345600000);

  expect(oneMilli.subtract(fiveDays).millis).toBe(
    oneMilli.minus(fiveDays).millis
  );
});

test("multipy", () => {
  expect(oneMilli.multiply(5).millis).toBe(5);
  expect(oneSec.multiply(5).millis).toBe(5 * 1000);
  expect(oneMin.multiply(5).millis).toBe(5 * 60000);
  expect(oneHour.multiply(5).millis).toBe(5 * 3600000);
  expect(oneDay.multiply(5).millis).toBe(fiveDaysMillis);

  expect(oneMilli.multiply(5).millis).toBe(oneMilli.times(5).millis);
});

test("divide", () => {
  expect(oneMilli.divide(5).millis).toBe(0.2);
  expect(oneSec.divide(5).millis).toBe(200);
  expect(oneMin.divide(5).millis).toBe(12000);
  expect(oneHour.divide(5).millis).toBe(720000);
  expect(oneDay.divide(5).millis).toBe(17280000);

  expect(oneMilli.divide(5).millis).toBe(oneMilli.over(5).millis);
});

test("after", () => {
  expect(fiveDays.after(epochDate).getTime()).toBe(
    new Date(fiveDaysMillis).getTime()
  );
});
test("before", () => {
  expect(fiveDays.before(date2).getTime()).toBe(
    new Date(fiveDaysMillis).getTime()
  );
});

test("between", () => {
  expect(Duration.between(epochDate, date1).millis).toBe(fiveDaysMillis);
  expect(Duration.between(date1, date2).millis).toBe(fiveDaysMillis);
  expect(Duration.between(date1, epochDate).millis).toBe(fiveDaysMillis * -1);
  expect(Duration.between(date2, date1).millis).toBe(fiveDaysMillis * -1);
});
