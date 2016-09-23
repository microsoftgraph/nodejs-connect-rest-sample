# Office 365 Node.js Connect sample using Microsoft Graph
![Build Status](https://ricalo.visualstudio.com/_apis/public/build/definitions/06256fa7-d8e5-4ca0-8639-7c00eb6f1fe9/10/badge "Build Status")

Connecting to Office 365 is the first step every app must take to start working with Office 365 services and data. This sample shows how to connect and then call one endpoint through the Microsoft Graph API (previously called Office 365 unified API), and uses the Office Fabric UI to create an Office 365 experience.

Try out the [Get started with Office 365 APIs](http://dev.office.com/getting-started/office365apis?platform=option-node#setup) page which simplifies registration so you can get this sample running faster.

![Office 365 Node.js Connect sample screenshot](./readme-imgs/screenshot.PNG)
> Note: For an in-depth look at the code for calling the Microsoft Graph API in a Node.js app, see [Call Microsoft Graph with a Node.js app](https://graph.microsoft.io/docs/platform/nodejs).

## Prerequisites

To use the Office 365 Node.js Connect sample, you need the following:
* An Office 365 account. You can sign up for [an Office 365 Developer subscription](https://portal.office.com/Signup/Signup.aspx?OfferId=6881A1CB-F4EB-4db3-9F18-388898DAF510&DL=DEVELOPERPACK&ali=1#0) that includes the resources that you need to start building Office 365 apps.

     > **Note:**
     If you already have a subscription, the previous link sends you to a page with the message *Sorry, you can’t add that to your current account*. In that case use an account from your current Office 365 subscription.<br /><br />
     If you are already signed-in to Office 365, the Sign-in button in the previous link shows the message *Sorry, we can't process your request*. In that case sign-out from Office 365 in that same page and sign-in again.

## Register the app

Registering your web application is the first step. 

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. On the top bar, click on your account and under the **Directory** list, choose the Active Directory tenant where you wish to register your application.
3. Click on **More Services** in the left hand nav, and choose **Azure Active Directory**.
4. Click on **App registrations** and choose **Add**.
5. Enter a friendly name for the application, for example 'MSGraphConnectNodejs' and select 'Web app/API' as the **Application Type**. For the Sign-on URL, enter *http://localhost:3000/login*. Click on **Create** to create the application.
6. While still in the Azure portal, choose your application, click on **Settings** and choose **Properties**.
7. Find the Application ID value and copy it to the clipboard.
8. Configure Permissions for your application:
9. In the **Settings** menu, choose the **Required permissions** section, click on **Add**, then **Select an API**, and select **Microsoft Graph**.
10. Then, click on Select Permissions and select **Sign in and read user profile** and **Send mail as a user**. Click **Select** and then **Done**.
11. In the **Settings** menu, choose the **Keys** section. Enter a description and select a duration for the key. Click **Save**.
12. **Important**: Copy the key value. You won't be able to access this value again once you leave this pane. You will use this value as your app secret.

## Configure and run the app

1. Update [```authHelper.js/client_id```](authHelper.js#L7) with your app id
2. Update [```authHelper.js/client_secret```](authHelper.js#L8) with your app secret
3. Update [```authHelper.js/redirect_uri```](authHelper.js#L9) with your application's redirect uri

Prerequisites
* [```node```](https://nodejs.org/en/) - JavaScript runtime built on Chrome V8
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) - Node Package Manager

To run the app, type the following into your command line:

1. ```npm install``` - install application dependencies
2. ```npm start``` - starts the application server


## Launch the app in your browser
Once the application server has been started, open your favorite web browser to ```http://localhost:3000```

## Questions and comments

We'd love to get your feedback about the Office 365 Node.js Connect sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) section of this repository.

Questions about Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Make sure that your questions or comments are tagged with [Office365] and [MicrosoftGraph].
  
## Additional resources

* [Office 365 APIs platform overview](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Getting started with Office 365 APIs](http://dev.office.com/getting-started/office365apis)
* [Overview of Microsoft Graph](http://graph.microsoft.io)
* [Office 365 APIs starter projects and code samples](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.
