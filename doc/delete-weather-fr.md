# Suppression de données météorologiques

`DELETE` `[nom d'hôte]:80/delete-weather`

Cette requête supprime toutes les données météorologiques enregistrées dans
Mabede.

Pour supprimer des données spécifiques, il faut inclure dans le corps de la
requête un tableau JSON énumérant leurs identifants.
Même quand on supprime une seule donnée, on doit indiquer son identifiant dans
un tableau.

Les identifiants sont inclus dans la réponse à la requête
[`get-weather`](get-weather-fr.md).

Un corps de requête vide supprime toutes les données.
```

```

Un objet vide supprime toutes les données.
```
{}
```

Un tableau vide supprime toutes les données.
```
[]
```

Ce tableau supprime la donnée 2.
```
[2]
```

Ce tableau supprime les données 1 et 3.
```
[1, 3]
```
