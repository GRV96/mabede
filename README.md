# Mabede

Mabede is a database accessible through a Node.js API.
Always use the datetime format `YYYY-MM-DD hh:mm:ss` in the requests.

Start the application:
```
docker-compose up -d
```

Stop the application:
```
docker-compose down
```

Delete the image created with docker-compose:
```
docker image rm mabede-mabede
```

### Description

`GET` `[host name]:80/`

The above request returns the API's description.

### Record weather data

`POST` `[host name]:80/add-weather`

The above request writes weather data in the database.
The request's body must consist of a weather record or
an array of weather records in the JSON format.
Each weather record must have the following attributes.

* `moment` (datetime): the moment when the data was recorded
* `temperature` (number): the temperature in degrees Celsius
* `preciProb` (number): the precipitation probability
* `windSpeed` (number): the wind speed in kilometers per hour (km/h)

**Body example with one weather record**
```
{
    "moment": "2024-08-12 21:30:00",
    "temperature": 19,
    "preciProb": 20,
    "windSpeed": 9
}
```

**Body example with an array of weather records**
```
[
    {
        "moment": "2024-08-12 21:30:00",
        "temperature": 19,
        "preciProb": 20,
        "windSpeed": 9
    },
    {
        "moment": "2024-08-18 16:07:50",
        "temperature": 25,
        "preciProb": 30,
        "windSpeed": 18
    }
]
```
