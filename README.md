# Office 365 Node.js Connect sample using Microsoft Graph
![Build Status](https://office.visualstudio.com/_apis/public/build/definitions/0323e522-dd35-4fbf-8d8a-a3370491558c/446/badge "Build Status")

Connecting to Office 365 is the first step every app must take to start working with Office 365 services and data. This sample shows how to connect and then call one endpoint through the Microsoft Graph API (previously called Office 365 unified API), and uses the Office Fabric UI to create an Office 365 experience.

The sample uses the v2.0 authentication endpoint, which enables users to sign in with either their personal or work or school Microsoft accounts.

![Office 365 Node.js Connect sample screenshot](./readme-imgs/screenshot.PNG)
> Note: For an in-depth look at the code for calling the Microsoft Graph API in a Node.js app, see [Call Microsoft Graph with a Node.js app](https://graph.microsoft.io/docs/platform/nodejs).

<a name="prerequisites"></a>
## Prerequisites

To use the Office 365 Node.js Connect sample, you need the following:
 * Either a [Microsoft](www.outlook.com) or [Office 365 for business account](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment#bk_Office365Account).
 * [Node.js](https://nodejs.org/) version 4 or 5.

<a name="register"></a>
##Register and configure the app

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.
2. Select **Add an app**.
3. Enter a name for the app, and select **Create application**.
	
	The registration page displays, listing the properties of your app.
 
4. Under **Platforms**, select **Add platform**.
5. Select **Web**.
6. Add the following to the list of **Redirect URIs**:

    ```
    http://localhost:3000/login
    ```    
    
7. Under **Application Secrets** click **Generate New Password**.
8. Copy the **New password generated** and **Application Id**, you'll need them in the next section.
9. Click **Save**.

## Configure and run the app

1. Update [```authHelper.js/client_id```](authHelper.js#L7) with your application id
2. Update [```authHelper.js/client_secret```](authHelper.js#L8) with your password

To run the app, type the following into your command line:

1. ```npm install``` - install application dependencies
2. ```npm start``` - starts the application server

## Launch the app in your browser
Once the application server has been started, open your web browser to ```http://localhost:3000```

## Questions and comments

We'd love to get your feedback about the Office 365 Node.js Connect sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) section of this repository.

Questions about Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Make sure that your questions or comments are tagged with [Office365] and [MicrosoftGraph].

<a name="contributing"></a>
## Contributing ##

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
  
## Additional resources

* [Office 365 APIs platform overview](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Getting started with Office 365 APIs](http://dev.office.com/getting-started/office365apis)
* [Overview of Microsoft Graph](http://graph.microsoft.io)
* [Office UI Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.
