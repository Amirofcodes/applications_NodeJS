applications_NodeJS


Ce projet démontre une application Node.js simple qui collecte des données utilisateur via une interface en ligne de commande, les envoie à un serveur, et les affiche sur une page web. Il met en évidence plusieurs concepts de base de Node.js, notamment :

- Entrée/sortie en ligne de commande
- Programmation asynchrone avec Promises et async/await
- Création de serveur HTTP avec Express
- Opérations sur le système de fichiers
- Communication client-serveur

## Structure du Projet

```
NODE-PRO/
│
├── node_modules/
├── .env                 # Variables d'environnement
├── app.js               # Script de base pour la collecte de données utilisateur
├── connect.js           # Script client pour la collecte de données et la communication avec le serveur
├── package-lock.json
├── package.json
├── server.js            # Serveur Express pour recevoir et afficher les données
└── user_data.txt        # Stockage local des données utilisateur
```

## Fonctionnalités

- Interface en ligne de commande pour la saisie des données utilisateur
- Validation des données pour le nom et l'âge
- Traitement et stockage des données côté serveur
- Interface web pour afficher les données collectées
- Rafraîchissement automatique de la page pour afficher les nouvelles données (toutes les 5 secondes)
- Horodatage pour chaque entrée de données (format : AAAA/MM/JJ, HH:mm:ss)

## Prérequis

- Node.js (version 12.0 ou supérieure recommandée)
- npm (généralement inclus avec Node.js)

## Installation

1. Clonez le dépôt :

2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez un fichier `.env` dans le répertoire racine et ajoutez-y les lignes suivantes :
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=s1mpl3
   ```

## Utilisation

1. Démarrez le serveur :
   ```
   node server.js
   ```

2. Dans un terminal séparé, exécutez le script client :
   ```
   node connect.js
   ```

3. Suivez les instructions dans le terminal pour saisir les données utilisateur.

4. Ouvrez un navigateur web et accédez à `http://localhost:3000` pour voir les données collectées.

## Points Clés du Code

### app.js

Ce fichier contient les fonctions de base pour collecter les données utilisateur via la ligne de commande et les sauvegarder dans un fichier.

Fonctions principales :
- `askName()` : Demande et valide le nom de l'utilisateur
- `askAge()` : Demande et valide l'âge de l'utilisateur
- `saveToFile()` : Sauvegarde les données utilisateur dans un fichier texte

### connect.js

Ce script collecte les entrées utilisateur et les envoie au serveur.

Caractéristiques principales :
- Utilise `readline` pour l'interaction en ligne de commande
- Implémente la fonction `sendDataToServer()` pour communiquer avec le serveur
- Gère les erreurs et ferme correctement les ressources

### server.js

Un serveur Express qui reçoit les données et sert une page web pour les afficher.

Caractéristiques principales :
- Utilise Express pour créer un serveur web
- Implémente des routes pour les requêtes GET (affichage de la page) et POST (réception des données)
- Stocke les données reçues en mémoire et les affiche sur la page web
- Inclut un rafraîchissement automatique de la page utilisant JavaScript côté client

## Résultats d'Apprentissage

Ce projet démontre :

1. L'utilisation de base des modules Node.js (http, fs, readline)
2. Les techniques de programmation asynchrone en JavaScript
3. La création simple de serveur avec Express
4. Les concepts d'API RESTful (points de terminaison GET et POST)
5. La gestion basique des erreurs dans les applications Node.js
6. La création d'interface en ligne de commande avec Node.js
7. La communication client-serveur utilisant HTTP

