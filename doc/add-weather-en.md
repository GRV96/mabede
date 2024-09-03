# Weather Data Recording

`POST` `[host name]:80/add-weather`

This request writes weather data in the database.
The request's body must consist of a weather record or
an array of weather records in the JSON format.
Each weather record must have the following attributes.

* `moment` (datetime): the moment when the data was captured
* `temperature` (number): the temperature (°C)
* `preciProb` (number): the precipitation probability (0.0 to 1.0)
* `windSpeed` (number): the wind speed (km/h)

**Body example with one weather record**
```
{
    "moment": "2024-08-12T21:30:00",
    "temperature": 19,
    "preciProb": 0.20,
    "windSpeed": 9
}
```

**Body example with an array of weather records**
```
[
    {
        "moment": "2024-08-12T21:30:00",
        "temperature": 19,
        "preciProb": 0.20,
        "windSpeed": 9
    },
    {
        "moment": "2024-08-18T16:07:50",
        "temperature": 25,
        "preciProb": 0.30,
        "windSpeed": 18
    },
    {
        "moment": "2024-08-19T18:13:13",
        "temperature": 14,
        "preciProb": 0.70,
        "windSpeed": 16
    }
]
```
