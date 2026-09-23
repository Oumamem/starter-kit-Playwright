# poc-playwright


## Installation

1. Ouvrir CMD et faire un git clone du projet en local :
```
cd path\repository
git clone 'url-to-complete'
cd poc-playwright
npm install
npx playwright install
```

2. Une fois le "npm install" terminé, la console affiche : 
``` 
npm WARN deprecated @types/cucumber-html-reporter@5.0.1: This is a stub types definition. cucumber-html-reporter provides its own type definitions, so you do not need this installed.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

added 142 packages, and audited 143 packages in 20s

11 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
``` 

**Les commandes ci-dessous vont clonr le projet en local et installer toutes les dépendances nécessaires pour lancer les tests playwright.**

## Run tests 

Rester sur le CMD dans le répertoire du projet : "C:\Users\SalimStasaid\poc-playwright" (par exemple) 


1. Lancer les tests avec la commande suivante : 
```
npm run test
```


2. Une fois le test terminé, la console affiche :  
```
> 'converting-and-selling-automation@1.0.0' test
> rmdir /S /Q outputs & cross-env NODE_ENV=uat.newlook LOCALE=fr_fr npx cucumber-js --config ./cucumber.ts -p test_runner --tags @all_orders --exit & ts-node ./generate-html-report.ts",


...................

3 scenarios (3 passed)
16 steps (16 passed)
0m13.733s (executing steps: 0m33.671s)

🚀 Cucumber HTML report outputs/reports/cucumber_report.html generated successfully 👍
```

3. Le rapport HTML s'ouvre par défaut à la fin du test. 

## Rapport HTML 

La console génère un rapport html détaillé du scénario et contenant des captures d'écran à chaque étape de test. 
Le rapport se trouve dans le repository du projet : "**converting-and-selling-automation/outputs/reports/cucumber_report.html**" 

Vous trouverez les propriétés du rapport dans le fichier situé à la racine du projet : **"generate-html-report.ts"** 


## Définir la commande à lancer pour les tests 
La commande ```npm test``` va lancer une autre commande qu'on a définie dans le fichier de configuration **package.json** : 

```
  "scripts": {
    "test": "rmdir /S /Q outputs & cross-env NODE_ENV=uat.newlook LOCALE=fr_fr npx cucumber-js --config ./cucumber.ts -p test_runner --tags @all_orders --exit & ts-node ./generate-html-report.ts",
    "report": "ts-node ./generate-html-report.ts",
  },
```

## Organisation du projet
Vous trouverez le détails de chaque dossier et ce qu'il contient ou doit contenir : 

**- features :** 
  - Dans ce dossier, on organise nos features cucumber et nos scénario, par exemple la feature : "**Order.feature**" 

**- resources\datasources: **
  - on met nos fichiers de JDD dans ce dossier en respectant la forme suivante, exemple du fichier **"account.ts"** : 

```
"newCustomer": {
      "email": "test.accept.auto.fr.#UNIQUETOKEN#@maildrop.cc",
      "password": "auTO.2021",
      "title": "mr",
      "first.name": "Auto",
      "last.name": "MateFR#RANDOMSTRING#",
      "address.line.1": "30 AVENUE MONTAIGNE",
      "postal.code": "75008",
      "city": "PARIS",
      "country.code": "FR",
      "phone": "+33198374655",
      "birthdate.day": "01",
      "birthdate.month": "02",
      "birthdate.year": "1980" 
    }
``` 

- **src** : 
C'est le dossier contenant les scénarios qu'on lance, les fonctions ainsi que le page object model. 

  1. **api** : tous nos fichiers concernant les API sont à mettre ici. Nous avons actuellement 2 dossiers contenant des fonctions nécessaires pour les appels API : 
        - **requesters :** c'est des fonctions en charge de définir comment sont réalisés les appels d'une manière personnalisée (construction de la route, authentification...etc.) en POST, GET ou XGET. 
        - **services :** c'est des fonctions en charge de constituer l’appel et d’analyser la réponse 

  2. **datamangement** : les jeu de données sont externalisés dans des sources dédiées.
On définit pour chaque type de données (utilisateurs, endpoints, commandes, …) un fournisseur en charge d’interagir avec la source de données et de maintenir une vision rafraichie de la donnée (token utilisateurs, identifiant et statuts de la dernière commande créée)

        - **providers :** on définit pour chaque type de données, un fournisseur en charge d'interagir avec la source de données et de maintenir une vision rafraichie de la donnée (token utilisateurs, identifiant et statuts de la dernière commande créée)
        - **types :** on définit chaque type de données (utilisateurs, commandes, endpoints,...etc). 

  3. **pages :** nous avons ici le référentiel par pages (objet repository) pour identifier tous les éléments de l'IHM testés au sein des étapes de test. (exemple : champ login, champ password, bouton "connexion", ...etc). 

  4. **stepdefs** : 
        - **hooks.ts** - ce fichier contient la fonction "**After**" qui s'execute à la fin de chaque scénario. 
        - **steps.ts** - ce fichier contient toutes les étapes de test appelés dans les features et scénarios cucumber 

  5. **World.ts** : fichier contenant les fonctions qu'on appelle dans les steps. Par exemple la fonction "OpenURL" à l'intérieur de la classe CustomWorld


**- node_modules :**
  - dossier contenant tous les packages nécessaires au projet qu'on a installé via la commande ```npm install```  


**- Outputs \ reports :** 
  - on trouve ici tous les rapports au format html ou json 


# starter-kit-Playwright
