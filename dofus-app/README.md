# Fullstack Test

## Description

Ce projet permet d'afficher des objets provenant du jeu **Dofus**, récupérés via l'API [DofusDB](https://api.dofusdb.fr/items/). 

- **Affichage des objets** : Une fois les objets chargés, on peux voir des informations sur chaque objet en cliquant dessus.
- **Recherche** : Il est possible de rechercher des objets par leur nom ou type.
- **Interactions** : 
  - Cliquer sur un dofus items recharche la page.
  - Cliquer sur "Charger des données" déclenche une requête à l'API pour récupérer les données et les stocker dans une base de données MongoDB.

## Installation

### Prérequis
Assurez-vous d'avoir **Docker Desktop** installé et en cours d'exécution pour MongoDB.

### Étapes d'installation

1. **Clonez ce repository** sur votre machine locale.

2. **Démarrer MongoDB avec Docker** :

   Ouvrez un terminal dans le répertoire du projet et lancez la commande suivante pour démarrer le service MongoDB avec Docker Compose. Cela va démarrer MongoDB dans un container Docker.

   ```bash
   docker-compose up -d
   npm install
   npm run dev

Accédez à l'application :

Ouvrez votre navigateur et allez à l'adresse suivante pour voir l'application en fonctionnement :

http://localhost:3000