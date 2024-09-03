# Mabede

## FRANÇAIS

Mabede est une base de données météorologiques accessible par une API Node.js.

Démarrer l'application en **production**:
```
docker-compose up -d
```

Démarrer l'application en **développement**:
```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
```

Arrêter l'application:
```
docker-compose down
```

Supprimer l'image créée par docker-compose:
```
docker image rm mabede-mabede
```

### Requêtes

L'API peut recevoir les requêtes suivantes.
Utilisez toujours le format date-heure `YYYY-MM-DDThh:mm:ss`.

#### Description de l'application

`GET` `[nom d'hôte]:80/`

Cette requête fournit une description de l'application.

#### [Enregistrement de données météorologiques](doc/add-weather-fr.md)

`POST` `[nom d'hôte]:80/add-weather`

#### [Accès aux données météorologiques](doc/get-weather-fr.md)

`GET` `[nom d'hôte]:80/get-weather`

#### [Suppression de données météorologiques](doc/delete-weather-fr.md)

`DELETE` `[nom d'hôte]:80/delete-weather`

## ENGLISH

Mabede is a weather database accessible through a Node.js API.

Start the application in **production**:
```
docker-compose up -d
```

Start the application in **development**:
```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
```

Stop the application:
```
docker-compose down
```

Delete the image created by docker-compose:
```
docker image rm mabede-mabede
```

### Requests

The API can recieve the following requests.
Always use the datetime format `YYYY-MM-DDThh:mm:ss`.

#### Application Description

`GET` `[host name]:80/`

The above request returns the application's description.

#### [Weather Data Recording](doc/add-weather-en.md)

`POST` `[host name]:80/add-weather`

#### [Access to the Weather Data](doc/get-weather-en.md)

`GET` `[host name]:80/get-weather`

#### [Weather Data Deletion](doc/delete-weather-en.md)

`DELETE` `[host name]:80/delete-weather`
