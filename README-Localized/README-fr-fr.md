# Exemple de connexion de Node.js à Office 365 avec Microsoft Graph
![Build Status](https://ricalo.visualstudio.com/_apis/public/build/definitions/06256fa7-d8e5-4ca0-8639-7c00eb6f1fe9/10/badge "Build Status")

La connexion à Office 365 est la première étape que chaque application doit suivre pour que vous puissiez commencer à travailler avec les données et services Office 365. Cet exemple explique comment connecter, puis appeler un point de terminaison via l’API Microsoft Graph (anciennement appelée API unifiée Office 365). Il utilise la structure d’interface utilisateur d’Office pour créer une expérience Office 365.

Consultez la page relative à la [prise en main des API Office 365](http://dev.office.com/getting-started/office365apis?platform=option-node#setup) pour enregistrer plus facilement votre application et exécuter plus rapidement cet exemple.

![Capture d’écran d’un exemple de connexion de Node.js à Office 365](../readme-imgs/screenshot.PNG)
> Remarque : pour en savoir plus sur le code d’appel de l’API Microsoft Graph dans une application Node.js, consultez la rubrique relative à l’[appel de Microsoft Graph avec une application Node.js](https://graph.microsoft.io/docs/platform/nodejs).

## Conditions requises

Pour utiliser l’exemple de connexion de Node.js à Office 365, vous devez disposer des éléments suivants :
* Un compte Office 365. Vous pouvez souscrire à [un abonnement Office 365 Développeur](https://aka.ms/devprogramsignup) comprenant les ressources dont vous avez besoin pour commencer à créer des applications Office 365.

     > **Remarque :**
     si vous avez déjà un abonnement, le lien précédent vous renvoie vers une page avec le message suivant : « Désolé, vous ne pouvez pas ajouter ceci à votre compte existant ». Dans ce cas, utilisez un compte lié à votre abonnement Office 365 existant.<br /><br />
     Si vous êtes déjà connecté à Office 365, le bouton de connexion dans le lien précédent affiche le message suivant : « Désolé, nous ne pouvons pas traiter votre demande ». Dans ce cas, déconnectez-vous d’Office 365 sur cette même page et connectez-vous à nouveau.
* Un client Microsoft Azure pour enregistrer votre application. Azure Active Directory (AD) fournit des services d’identité que les applications utilisent à des fins d’authentification et d’autorisation. Un abonnement d’évaluation peut être demandé ici : [Microsoft Azure](https://account.windowsazure.com/SignUp).

     > **Important :**
     vous devez également vous assurer que votre abonnement Azure est lié à votre client Office 365. Pour cela, consultez le billet du blog de l’équipe d’Active Directory relatif à la [création et la gestion de plusieurs fenêtres dans les répertoires Azure Active Directory](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx). La section sur l’**ajout d’un nouveau répertoire** vous explique comment procéder. Pour en savoir plus, vous pouvez également consulter la rubrique relative à la [configuration de votre environnement de développement Office 365](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription) et la section sur l’**association de votre compte Office 365 à Azure Active Directory pour créer et gérer des applications**.
* Un ID client, une clé secrète client et les valeurs d’URI de redirection d’une application enregistrée dans Azure. Cet exemple d’application doit obtenir l’autorisation **Envoyer un courrier électronique en tant qu’utilisateur** pour **Microsoft Graph**. [Ajoutez une application web dans Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp) et [accordez-lui les autorisations appropriées](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure).

     > **Remarque :**
     pendant l’enregistrement de l’application, veillez à indiquer **http://localhost:3000/login** comme **URL d’authentification**.
     
* Consultez la section relative à la [configuration et à l’exécution de l’application](#configure-and-run-the-app) pour connaître les conditions préalables spécifiques de la plateforme.

## Configuration et exécution de l’application

1. Mettre à jour [```authHelper.js/client_id```](authHelper.js#L7) avec l’ID client de votre application
2. Mettre à jour [```authHelper.js/client_secret```](authHelper.js#L8) avec la clé secrète cliente de votre application
3. Mettre à jour [```authHelper.js/redirect_uri```](authHelper.js#L9) avec l’URI de redirection de votre application

Conditions requises
* [```nœud```](https://nodejs.org/en/) - JavaScript Runtime basé sur Chrome V8
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) - Gestionnaire de package de Node

Pour exécuter l’application, saisissez les informations suivantes dans votre ligne de commande :

1. ```npm install``` - installe les dépendances de l’application
2. ```npm start``` - lance le serveur d’applications


## Lancement de l’application dans le navigateur
Une fois le serveur d’applications démarré, ouvrez votre navigateur web préféré sur la page ```http://localhost:3000```

## Questions et commentaires

Nous serions ravis de connaître votre opinion sur l’exemple de connexion de Node.js à Office 365. Vous pouvez nous faire part de vos questions et suggestions dans la rubrique [Problèmes](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) de ce référentiel.

Si vous avez des questions sur le développement d’Office 365, envoyez-les sur [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Veillez à poser vos questions ou à rédiger vos commentaires avec les tags [MicrosoftGraph] et [Office 365].
  
## Ressources supplémentaires

* [Présentation de la plateforme des API Office 365](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Prise en main des API Office 365](http://dev.office.com/getting-started/office365apis)
* [Présentation de Microsoft Graph](http://graph.microsoft.io)
* [Projets de démarrage et exemples de codes des API Office 365](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Structure de l’interface utilisateur Office](https://github.com/OfficeDev/Office-UI-Fabric)

## Copyright
Copyright (c) 2016 Microsoft. Tous droits réservés.


