# Access to the Weather Data

`GET` `[host name]:80/get-weather`

This request returns a JSON array containing all weather data recorded in
Mabede.
Parameters `fromMoment` and `toMoment` are inclusive bounds that allow to limit
the selection to a time interval.

Example:
```
[host name]:80/get-weather?fromMoment=2024-08-14T00:00:00&toMoment=2024-08-19T00:00:00
```
