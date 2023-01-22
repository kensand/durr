import { Duration, IDuration, isIDuration } from "./Duration";

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

  expect(oneMilli.add(fiveDays.millis).millis).toBe(1 + fiveDaysMillis);
  expect(oneSec.add(fiveDays.millis).millis).toBe(
    oneSecMillis + fiveDaysMillis
  );
  expect(oneMin.add(fiveDays.millis).millis).toBe(
    oneMinMillis + fiveDaysMillis
  );
  expect(oneHour.add(fiveDays.millis).millis).toBe(
    oneHourMillis + fiveDaysMillis
  );
  expect(oneDay.add(fiveDays.millis).millis).toBe(
    oneDayMillis + fiveDaysMillis
  );
  expect(oneMilli.add(fiveDays.millis).millis).toBe(
    oneMilli.plus(fiveDays).millis
  );
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

  expect(fiveDays.subtract(oneMilli.millis).millis).toBe(fiveDaysMillis - 1);
  expect(fiveDays.subtract(oneSec.millis).millis).toBe(fiveDaysMillis - 1000);
  expect(fiveDays.subtract(oneMin.millis).millis).toBe(fiveDaysMillis - 60000);
  expect(fiveDays.subtract(oneHour.millis).millis).toBe(
    fiveDaysMillis - 3600000
  );
  expect(fiveDays.subtract(oneDay.millis).millis).toBe(345600000);
  expect(oneMilli.subtract(fiveDays.millis).millis).toBe(
    oneMilli.minus(fiveDays).millis
  );
});

test("multiply", () => {
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

  const start = Date.now();
  const res = fiveDays.after();
  const end = Date.now();
  expect(res.getTime()).toBeLessThanOrEqual(start + fiveDaysMillis);
  expect(res.getTime()).toBeGreaterThanOrEqual(end + fiveDaysMillis);
});
test("before", () => {
  expect(fiveDays.before(date2).getTime()).toBe(
    new Date(fiveDaysMillis).getTime()
  );

  const start = Date.now();
  const res = fiveDays.before();
  const end = Date.now();
  expect(res.getTime()).toBeGreaterThanOrEqual(start - fiveDaysMillis);
  expect(res.getTime()).toBeLessThanOrEqual(end - fiveDaysMillis);
});

test("between", () => {
  expect(Duration.between(epochDate, date1).millis).toBe(fiveDaysMillis);
  expect(Duration.between(date1, date2).millis).toBe(fiveDaysMillis);
  expect(Duration.between(date1, epochDate).millis).toBe(fiveDaysMillis * -1);
  expect(Duration.between(date2, date1).millis).toBe(fiveDaysMillis * -1);
});

test("isIDuration", () => {
  expect(isIDuration({ milliseconds: 4 })).toBe(true);
  expect(isIDuration(Duration.minutes(5))).toBe(true);
  expect(isIDuration('{"milliseconds": 4}')).toBe(false);
  expect(isIDuration({ milliseconds: "abc" })).toBe(false);
  expect(isIDuration({ milliseconds: undefined })).toBe(false);
  expect(isIDuration({ milliseconds: 4, foo: "bar" })).toBe(true);
  expect(isIDuration({})).toBe(false);
  expect(isIDuration("abc")).toBe(false);
});

test("json", () => {
  const props: IDuration = { milliseconds: 5 };
  const str = JSON.stringify(props);
  const instance = new Duration(props);
  expect(instance.toJson()).toStrictEqual(props);
  expect(Duration.fromJson(props).milliseconds).toBe(5);
  expect(JSON.stringify(instance.toJson())).toStrictEqual(str);
  expect(() => Duration.fromJson({ foo: "bar" })).toThrowError(
    new Error("Unrecognized Type", {
      cause: { foo: "bar" },
    })
  );
}, 1000000);

test("seconds", () => {
  expect(Duration.milliseconds(5000).seconds).toBe(5);
});

test("minutes", () => {
  expect(Duration.milliseconds(120000).minutes).toBe(2);
});

test("hours", () => {
  expect(Duration.milliseconds(7200000).hours).toBe(2);
});

test("days", () => {
  expect(Duration.milliseconds(172800000).days).toBe(2);
});

test("equals", () => {
  expect(Duration.milliseconds(172800000).equals(Duration.days(2))).toBe(true);
  expect(Duration.milliseconds(172800000).equals(172800000)).toBe(false);
});

test("lessThan", () => {
  expect(Duration.milliseconds(172800001).lessThan(Duration.days(2))).toBe(
    false
  );
  expect(Duration.milliseconds(172799999).lessThan(Duration.days(2))).toBe(
    true
  );
});

test("greaterThan", () => {
  expect(Duration.milliseconds(172799999).greaterThan(Duration.days(2))).toBe(
    false
  );
  expect(Duration.milliseconds(172800001).greaterThan(Duration.days(2))).toBe(
    true
  );
});

test("lessThanOrEqual", () => {
  expect(
    Duration.milliseconds(172800001).lessThanOrEqual(Duration.days(2))
  ).toBe(false);
  expect(
    Duration.milliseconds(172799999).lessThanOrEqual(Duration.days(2))
  ).toBe(true);
  expect(
    Duration.milliseconds(172800000).lessThanOrEqual(Duration.days(2))
  ).toBe(true);
});

test("greaterThanOrEqual", () => {
  expect(
    Duration.milliseconds(172799999).greaterThanOrEqual(Duration.days(2))
  ).toBe(false);
  expect(
    Duration.milliseconds(172800001).greaterThanOrEqual(Duration.days(2))
  ).toBe(true);
  expect(
    Duration.milliseconds(172800000).greaterThanOrEqual(Duration.days(2))
  ).toBe(true);
});
