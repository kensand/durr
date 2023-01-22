import { Day, Hour, Minute, Second } from "./Units";

export interface IDuration {
  readonly milliseconds: number;
}

export function isIDuration(it: any) {
  return typeof it == "object" && typeof it.milliseconds == "number";
}

export class Duration implements IDuration {
  public readonly milliseconds: number;
  public constructor(props: IDuration) {
    this.milliseconds = props.milliseconds;
  }

  public readonly add = (other: IDuration | number) =>
    Duration.milliseconds(
      this.milliseconds +
        (typeof other == "number" ? other : other.milliseconds)
    );
  public readonly subtract = (other: IDuration | number) =>
    Duration.milliseconds(
      this.milliseconds -
        (typeof other == "number" ? other : other.milliseconds)
    );

  public readonly multiply = (other: number) =>
    Duration.milliseconds(this.milliseconds * other);

  public readonly divide = (other: number) =>
    Duration.milliseconds(this.milliseconds / other);

  public readonly plus = this.add;
  public readonly minus = this.subtract;
  public readonly times = this.multiply;
  public readonly over = this.divide;

  public readonly after = (date: Date = new Date()) =>
    new Date(date.getTime() + this.milliseconds);

  public readonly before = (date: Date = new Date()) =>
    new Date(date.getTime() - this.milliseconds);

  public get millis(): number {
    return this.milliseconds;
  }

  public get seconds(): number {
    return Second.fromMillis(this.milliseconds);
  }
  public get minutes(): number {
    return Minute.fromMillis(this.milliseconds);
  }
  public get hours(): number {
    return Hour.fromMillis(this.milliseconds);
  }
  public get days(): number {
    return Day.fromMillis(this.milliseconds);
  }

  public readonly equals = (other: any) =>
    isIDuration(other) && this.milliseconds == other.milliseconds;
  public readonly lessThan = (other: IDuration) =>
    this.milliseconds < other.milliseconds;
  public readonly greaterThan = (other: IDuration) =>
    this.milliseconds > other.milliseconds;
  public readonly lessThanOrEqual = (other: IDuration) =>
    this.milliseconds <= other.milliseconds;
  public readonly greaterThanOrEqual = (other: IDuration) =>
    this.milliseconds >= other.milliseconds;

  public toJson(): IDuration {
    return { milliseconds: this.milliseconds };
  }

  static readonly fromJson = (it: any) => {
    if (isIDuration(it)) {
      return new Duration(it);
    } else {
      throw new Error("Unrecognized Type", {
        cause: it,
      });
    }
  };

  static readonly milliseconds = (num: number) =>
    new Duration({ milliseconds: num });
  static readonly millis = (num: number) => new Duration({ milliseconds: num });
  static readonly seconds = (num: number) =>
    this.milliseconds(Second.toMillis(num));
  static readonly minutes = (num: number) =>
    this.milliseconds(Minute.toMillis(num));
  static readonly hours = (num: number) =>
    this.milliseconds(Hour.toMillis(num));
  static readonly days = (num: number) => this.milliseconds(Day.toMillis(num));

  static readonly between = (start: Date, end: Date) =>
    Duration.milliseconds(end.getTime() - start.getTime());
}
