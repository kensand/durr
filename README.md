# Durr

A convenient, simple TypeScript duration library.

```javascript
import { Duration } from "durr"

Duration.seconds(5).millis // 5000
Duration.minutes(90).hours // 1.5

Duration.hours(32).toJson() // { milliseconds: 115200000}
Duration.fromJson({ milliseconds: 3600000 }).days // 0.04166667
```