# Mabede

Mabede is a database accessible through a Node.js API.
Always use the datetime format `YYYY-MM-DD hh:mm:ss` in the requests.

Start the application in **production**:
```
docker-compose up -d --build
```

Start the application in **development**:
```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
```

Stop the application:
```
docker-compose down
```

The `--build` flag rebuilds the image every time the application starts.
Without it, you need to delete the image before restarting.
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
    "preciProb": 0.20,
    "windSpeed": 9
}
```

**Body example with an array of weather records**
```
[
    {
        "moment": "2024-08-12 21:30:00",
        "temperature": 19,
        "preciProb": 0.20,
        "windSpeed": 9
    },
    {
        "moment": "2024-08-18 16:07:50",
        "temperature": 25,
        "preciProb": 0.30,
        "windSpeed": 18
    },
    {
        "moment": "2024-08-19 18:13:13",
        "temperature": 14,
        "preciProb": 0.70,
        "windSpeed": 16
    }
]
```
