# Weather Data Deletion

`DELETE` `[host name]:80/delete-weather`

This request deletes all weather data recorded in the database.

In order to delete specific data, include a JSON array enumerating their IDs in
the request's body.
Even when deleting one data, indicate its ID in an array.

Weather data IDs are included in the response to request
[`get-weather`](get-weather-en.md).

An empty request body deletes all data.
```

```

An empty object deletes all data.
```
{}
```

An empty array deletes all data.
```
[]
```

This array deletes weather data 2.
```
[2]
```

This array deletes weather data 1 and 3.
```
[1, 3]
```
