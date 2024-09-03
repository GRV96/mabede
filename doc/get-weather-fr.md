# Accès aux données météorologiques

`GET` `[nom d'hôte]:80/get-weather`

Cette requête renvoie un tableau JSON contenant toutes les données
météorologiques enregistrées dans Mabede.
Les paramètres `fromMoment` et `toMoment` sont des bornes inclusives permettant
de limiter la sélection à un intervalle de temps.

Exemple:
```
[nom d'hôte]:80/get-weather?fromMoment=2024-08-14T00:00:00&toMoment=2024-08-19T00:00:00
```
