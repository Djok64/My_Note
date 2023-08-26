# MVC Express

## Description

Ce dépôt est une simple structure MVC (Modèle-Vue-Contrôleur) pour Express, créée à partir de zéro.

### Étapes

Cloner le dépôt depuis Github :

Cela signifie que vous devez copier le projet depuis Github sur votre ordinateur local en utilisant la commande git clone URL_DU_DEPOT.
Installer les dépendances :

Exécutez npm install ou yarn install. Cela installera toutes les bibliothèques et modules nécessaires pour faire fonctionner le projet, comme défini dans le fichier package.json.
Créer le fichier .env à partir du fichier .env.sample et ajouter vos paramètres de base de données :

Vous devez copier le fichier .env.sample et le renommer en .env. Ensuite, renseignez les informations de connexion à votre base de données.
makefile
Copy code
DB_HOST=votre_hôte_db
DB_PORT=votre_port_db
DB_USER=votre_utilisateur_db
DB_PASSWORD=votre_mot_de_passe_db
DB_NAME=nom_de_votre_db
N'effacez pas le fichier .sample, il doit être conservé comme exemple de structure.
Adaptez le fichier database.sql avec vos propres tables :

Modifiez ce fichier SQL pour y ajouter les structures des tables dont vous avez besoin.
Importez ensuite le script dans votre serveur SQL. Vous pouvez le faire manuellement ou en exécutant le script migrate avec la commande npm run migrate ou yarn run migrate.
Démarrer le serveur en mode développement :

Exécutez npm run dev ou yarn run dev. Cela démarrera votre application en utilisant index.js avec l'outil nodemon (qui redémarre automatiquement votre serveur lors de modifications du code).
Aller sur localhost:5000 avec votre navigateur préféré :

Après avoir démarré le serveur, ouvrez votre navigateur et allez à l'adresse localhost:5000 pour voir l'application en action.
Créez votre propre application web à partir de ce kit de démarrage.

## Utilisateurs Windows

Si vous développez sur Windows, vous devriez modifier votre configuration git pour changer les règles de fin de ligne avec cette commande :

git config --global core.autocrlf true

Exemple
Un exemple (une liste basique d'articles) est fourni. Vous pouvez charger le fichier database.sql dans une base de données de test. Les URL accessibles sont :

Page d'accueil : GET localhost:5000/
Navigation entre les articles : GET localhost:5000/items
Lire un article : GET localhost:5000/items/:id (où :id est l'identifiant de l'article)
Éditer un article : PUT localhost:5000/items/:id
Ajouter un article : POST localhost:5000/items
Supprimer un article : DELETE localhost:5000/items/:id
Vous pouvez trouver toutes ces routes déclarées dans le fichier src/router.js. Vous pouvez y ajouter vos propres routes, contrôleurs et modèles.

# MVC Express

## Description

This repository is a simple Express MVC structure from scratch.

## Steps

1. Clone the repo from Github.
2. Run `npm install` or `yarn install`.
3. Create _.env_ from _.env.sample_ file and add your DB parameters. Don't delete the _.sample_ file, it must be kept.

```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

4. Adapt _database.sql_ with your own tables. Import the script in your SQL server. You can do it manually or run _migrate_ script (either using `npm run migrate` or `yarn run migrate`).
5. Start the server in dev mode with `npm run dev` or `yarn run dev`. This will run `index.js` using _nodemon_.
6. Go to `localhost:5000` with your favorite browser.
7. From this starter kit, create your own web application.

### Windows Users

If you develop on Windows, you should edit you git configuration to change your end of line rules with this command :

`git config --global core.autocrlf true`

## Example

An example (a basic list of items) is provided (you can load the _database.sql_ file in a test database). The accessible URLs are :

- Home page: [GET localhost:5000/](localhost:5000/)
- Item browse: [GET localhost:5000/items](localhost:5000/items)
- Item read: [GET localhost:5000/items/:id](localhost:5000/items/2)
- Item edit: PUT localhost:5000/items/:id
- Item add: POST localhost:5000/items
- Item deletion: DELETE localhost:5000/items/:id

You can find all these routes declared in the file `src/router.js`. You can add your own new routes, controllers and models.
