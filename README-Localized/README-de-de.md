# Office 365 Node.js Connect-Beispiel unter Verwendung von Microsoft Graph
![Build Status](https://ricalo.visualstudio.com/_apis/public/build/definitions/06256fa7-d8e5-4ca0-8639-7c00eb6f1fe9/10/badge "Build Status")

Für die Arbeit mit Office 365-Diensten und -Daten muss jede App zunächst eine Verbindung zu Office 365 herstellen. In diesem Beispiel wird gezeigt, wie die Verbindung zur und dann der Aufruf eines Endpunkts über die Microsoft Graph-API (wurde zuvor als vereinheitlichte Office 365-API bezeichnet) erfolgt. Ferner wird darin die Office Fabric-Benutzeroberfläche zum Erstellen einer Office 365-Erfahrung verwendet.

Rufen Sie die Seite [Erste Schritte mit Office 365-APIs](http://dev.office.com/getting-started/office365apis?platform=option-node#setup) auf. Auf dieser wird die Registrierung vereinfacht, damit Sie dieses Beispiel schneller ausführen können.

![Screenshot des Office 365 Node.js Connect-Beispiels](../readme-imgs/screenshot.PNG)
> Hinweis: Einen umfassenden Einblick in den Code  zum Aufrufen der Microsoft Graph-API in einer Node.js-App finden Sie unter [Aufrufen von Microsoft Graph mit einer Node.js-App](https://graph.microsoft.io/docs/platform/nodejs).

## Voraussetzungen

Zum Verwenden des Office 365 Node.js Connect-Beispiels benötigen Sie Folgendes:
* Ein Office 365-Konto. Sie können sich für ein [Office 365-Entwicklerabonnement](https://aka.ms/devprogramsignup) registrieren, das alle Ressourcen umfasst, die Sie zum Einstieg in die Entwicklung von Office 365-Apps benötigen.

     > **Hinweis:**
     Wenn Sie bereits über ein Abonnement verfügen, gelangen Sie über den vorherigen Link zu einer Seite mit der Meldung „Leider können Sie Ihrem aktuellen Konto diesen Inhalt nicht hinzufügen“. Verwenden Sie in diesem Fall ein Konto aus Ihrem aktuellen Office 365-Abonnement.<br /><br />
     Wenn Sie bereits bei Office 365 angemeldet sind, wird auf der Anmeldeschaltfläche im vorherigen Link die Meldung „Ihre Anforderung konnte leider nicht verarbeitet werden“ angezeigt. Melden Sie sich in diesem Fall aus Office 365 auf derselben Seite ab, und melden Sie sich erneut an.
* Ein Microsoft Azure-Mandant zum Registrieren Ihrer Anwendung. Von Azure Active Directory (AD) werden Identitätsdienste bereitgestellt, die durch Anwendungen für die Authentifizierung und Autorisierung verwendet werden. Hier kann ein Testabonnement erworben werden: [Microsoft Azure](https://account.windowsazure.com/SignUp)

     > **Wichtig:**
     Sie müssen zudem sicherstellen, dass Ihr Azure-Abonnement an Ihren Office 365-Mandanten gebunden ist. Rufen Sie dafür den Blogpost [Creating and Managing Multiple Windows Azure Active Directories](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx) des Active Directory-Teams auf. Im Abschnitt **Adding a new directory** finden Sie Informationen über die entsprechende Vorgehensweise. Weitere Informationen finden Sie zudem unter [Einrichten Ihrer Office 365-Entwicklungsumgebung](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription) im Abschnitt **Verknüpfen Ihres Office 365-Kontos mit Azure AD zum Erstellen und Verwalten von Apps**.
* Eine Client-ID, ein Clientgeheimnis und Umleitungs-URI-Werte einer in Azure registrierten Anwendung. Dieser Beispielanwendung muss die Berechtigung zum **Senden von E-Mails als angemeldeter Benutzer** für **Microsoft Graph** gewährt werden. [Fügen Sie eine Webanwendung in Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp) hinzu, und [gewähren Sie ihr die entsprechenden Berechtigungen](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure).

     > **Hinweis:**
     Stellen Sie während des App-Registrierungsvorgangs sicher, dass **http://localhost:3000/lolgin** als **Anmelde-URL** angegeben ist.
     
* Plattformspezifische Voraussetzungen finden Sie im Abschnitt [Konfigurieren und Ausführen der App](#configure-and-run-the-app).

## Konfigurieren und Ausführen der App

1. Aktualisieren Sie [```authHelper.js/client_id```](authHelper.js#L7) mit der Client-ID Ihrer Anwendung.
2. Aktualisieren Sie [```authHelper.js/client_secret```](authHelper.js#L8) mit dem geheimen Clientschlüssel Ihrer Anwendung.
3. Aktualisieren Sie [```authHelper.js/redirect_uri```](authHelper.js#L9) mit der Umleitungs-URI Ihrer Anwendung.

Voraussetzungen
* [```Knoten```](https://nodejs.org/en/) -JavaScript-Laufzeit basierend auf Chrome V8
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) - Knotenpaket-Manager

Geben Sie zum Ausführen der App Folgendes an der Befehlszeile ein:

1. ```npm install``` – installiert Anwendungsabhängigkeiten
2. ```npm start``` – startet den Anwendungsserver


## Starten der App im Browser
Öffnen Sie nach dem Starten des Anwendungsservers in Ihrem bevorzugten Browser ```http://localhost:3000```.

## Fragen und Kommentare

Wir schätzen Ihr Feedback hinsichtlich des Office 365 Node.js Connect-Beispiels. Sie können uns Ihre Fragen und Vorschläge über den Abschnitt [Probleme](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) dieses Repositorys senden.

Allgemeine Fragen zur Office 365-Entwicklung sollten in [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph) gestellt werden. Stellen Sie sicher, dass Ihre Fragen oder Kommentare mit [Office365] und [MicrosoftGraph] markiert sind.
  
## Zusätzliche Ressourcen

* [Office 365-APIs – Plattformübersicht](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Erste Schritte mit Office 365-APIs](http://dev.office.com/getting-started/office365apis)
* [Übersicht über Microsoft Graph](http://graph.microsoft.io)
* [Office 365-APIs-Startprojekte und -Codebeispiele](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office-Benutzeroberfläche Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Copyright
Copyright (c) 2016 Microsoft. Alle Rechte vorbehalten.


