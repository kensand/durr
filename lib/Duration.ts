import { Day, Hour, Millisecond, Minute, Second } from "./Units";
export class Duration {
  private readonly _milliseconds: number;
  public constructor(milliseconds: number) {
    this._milliseconds = milliseconds;
  }

  public readonly add = (other: Duration | number) =>
    new Duration(
      this._milliseconds +
        (typeof other == "number" ? other : other._milliseconds)
    );
  public readonly subtract = (other: Duration | number) =>
    new Duration(
      this._milliseconds -
        (typeof other == "number" ? other : other._milliseconds)
    );

  public readonly multiply = (other: number) =>
    new Duration(this._milliseconds * other);

  public readonly divide = (other: number) =>
    new Duration(this._milliseconds / other);

  public readonly plus = this.add;
  public readonly minus = this.subtract;
  public readonly times = this.multiply;
  public readonly over = this.divide;

  public readonly after = (date: Date = new Date()) =>
    new Date(date.getTime() + this._milliseconds);

  public readonly before = (date: Date = new Date()) =>
    new Date(date.getTime() - this._milliseconds);

  public get millis(): number {
    return Millisecond.fromMillis(this._milliseconds);
  }

  public get seconds(): number {
    return Second.fromMillis(this._milliseconds);
  }
  public get minutes(): number {
    return Minute.fromMillis(this._milliseconds);
  }
  public get hours(): number {
    return Hour.fromMillis(this._milliseconds);
  }
  public get days(): number {
    return Day.fromMillis(this._milliseconds);
  }

  public equals = (other: any) =>
    Duration.isDuration(other) && this.millis == other.millis;
  public lessThan = (other: any) =>
    Duration.isDuration(other) && this.millis < other.millis;
  public greaterThan = (other: any) =>
    Duration.isDuration(other) && this.millis > other.millis;
  public lessThanOrEqual = (other: any) =>
    Duration.isDuration(other) && this.millis <= other.millis;
  public greaterThanOrEqual = (other: any) =>
    Duration.isDuration(other) && this.millis >= other.millis;

  static milliseconds = (num: number) => new Duration(num);
  static seconds = (num: number) => new Duration(Second.toMillis(num));
  static minutes = (num: number) => new Duration(Minute.toMillis(num));
  static hours = (num: number) => new Duration(Hour.toMillis(num));
  static days = (num: number) => new Duration(Day.toMillis(num));

  static between = (start: Date, end: Date) =>
    Duration.milliseconds(end.getTime() - start.getTime());

  static isDuration = (it: any): it is Duration => it.millis;
}
