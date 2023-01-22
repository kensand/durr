import { Day, Hour, Millisecond, Minute, Second } from "./Units";

test("millisecond", () => {
  expect(Millisecond.fromMillis(5)).toBe(5);
  expect(Millisecond.toMillis(5)).toBe(5);
  expect(Millisecond.fromMillis(Millisecond.toMillis(5))).toBe(5);
});
test("second", () => {
  expect(Second.fromMillis(5000)).toBe(5);
  expect(Second.toMillis(5)).toBe(5000);
  expect(Second.fromMillis(Second.toMillis(5))).toBe(5);
});

test("minute", () => {
  expect(Minute.fromMillis(300000)).toBe(5);
  expect(Minute.toMillis(5)).toBe(300000);
  expect(Minute.fromMillis(Minute.toMillis(5))).toBe(5);
});

test("hour", () => {
  expect(Hour.fromMillis(18000000)).toBe(5);
  expect(Hour.toMillis(5)).toBe(18000000);
  expect(Hour.fromMillis(Hour.toMillis(5))).toBe(5);
});

test("day", () => {
  expect(Day.fromMillis(432000000)).toBe(5);
  expect(Day.toMillis(5)).toBe(432000000);
  expect(Day.fromMillis(Day.toMillis(5))).toBe(5);
});
