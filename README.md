# Mabede

Mabede is a database accessible through a Node.js API.

Start the application:
```
docker-compose up -d
```

Stop the application:
```
docker-compose down
```

### Description

`GET` `[host name]:80/`

The above request returns the API's description.

### Record weather data

`POST` `[host name]:80/record-weather`

The above request writes weather data in the database.
The request's body must be a JSON string such as the one below.

```
{
    "moment": "2024-08-12T21:30:00",
    "temperature": 19,
    "preciProb": 20,
    "windSpeed": 9
}
```
