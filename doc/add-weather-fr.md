# Enregistrement de données météorologiques

`POST` `[nom d'hôte]:80/add-weather`

Cette requête ajoute des données météorologiques dans la base de données.
Le corps de la requête doit consister en une donnée météorologique ou
en un tableau de données météorologiques en format JSON.
Chaque donnée météorologique doit comporter les attributs suivants.

* `moment` (date-heure): le moment où la donnée a été captée
* `temperature` (nombre): la température (°C)
* `preciProb` (nombre): la probabilité de précipitation (0.0 à 1.0)
* `windSpeed` (nombre): la vitesse du vent (km/h)

**Exemple de corps de requête consistant en une donnée**
```
{
    "moment": "2024-08-12T21:30:00",
    "temperature": 19,
    "preciProb": 0.20,
    "windSpeed": 9
}
```

**Exemple de corps de requête consistant en un tableau de données**
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
