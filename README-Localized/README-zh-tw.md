# 使用 Microsoft Graph 的 Office 365 Node.js Connect 範例
[![Build Status](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect.svg?branch=master)](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect)

連接到 Office 365 是每個應用程式要開始使用 Office 365 服務和資料時必須採取的第一個步驟。此範例示範如何透過 Microsoft Graph API (之前稱為 Office 365 統一 API) 連接而後呼叫一個端點，然後使用 Office Fabric UI 來打造 Office 365 經驗。

嘗試可簡化註冊的 [Office 365 API 入門](http://dev.office.com/getting-started/office365apis?platform=option-node#setup)頁面，以便您能更快速地執行這個範例。

![Office 365 Node.js Connect 範例螢幕擷取畫面](../readme-imgs/screenshot.PNG)
> 附註：為深入了解在 Node.js 應用程式中用於呼叫 Microsoft Graph API 的程式碼，請參閱[在 Node.js 應用程式中呼叫 Microsoft Graph](https://graph.microsoft.io/docs/platform/nodejs)。

## 必要條件

若要使用 Office 365 Node.js Connect 範例，您需要下列各項：
* Office 365 帳戶。您可以註冊 [Office 365 開發人員訂閱](https://aka.ms/devprogramsignup)，其中包含在開始建置 Office 365 應用程式時，您所需的資源。

     > **附註：**
     如果您已有訂用帳戶，則先前的連結會讓您連到顯示 *抱歉，您無法將之新增到您目前的帳戶* 訊息的頁面。在此情況下，請使用您目前的 Office 365 訂用帳戶所提供的帳戶。<br /><br />
     如果您已登入 Office 365，先前連結中的登入按鈕會顯示 *抱歉，我們無法處理您的要求* 訊息。在此情況下，在相同的頁面登出 Office 365，再重新登入。
* 用來註冊您的應用程式的 Microsoft Azure 租用戶。Azure Active Directory (AD) 會提供識別服務，以便應用程式用於驗證和授權。在這裡可以取得試用版的訂用帳戶：[Microsoft Azure](https://account.windowsazure.com/SignUp)。

     > **重要事項**
     您還需要確定您的 Azure 訂用帳戶已繫結至您的 Office 365 租用戶。若要執行這項操作，請參閱 Active Directory 小組的部落格文章：[建立和管理多個 Windows Azure Active Directory](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx)。**新增目錄**一節將說明如何執行這項操作。如需詳細資訊，也可以參閱[設定 Office 365 開發環境](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription)和**建立 Office 365 帳戶與 Azure AD 的關聯以便建立和管理應用程式**一節。
* 在 Azure 中註冊之應用程式的用戶端識別碼、用戶端密碼及重新導向 URI 值。此範例應用程式必須取得 **Microsoft Graph** 的 [以登入的使用者身分傳送郵件]<e /> 權限。[在 Azure 中新增 Web 應用程式](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp)和[授與適當的權限](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure)給它。

     > **附註：**
     在應用程式註冊過程中，請務必指定 **http://localhost:3000/login** 做為 [登入 URL]<e />。
     
* 請參閱章節[設定及執行應用程式](#configure-and-run-the-app)以了解平台特定的必要條件。

## 設定和執行應用程式

1. 使用您應用程式的用戶端識別碼來更新 [```authHelper.js/client_id```](authHelper.js#L7)
2. 使用您應用程式的用戶端密碼來更新 [```authHelper.js/client_secret```](authHelper.js#L8)
3. 使用您應用程式的重新導向 URI 來更新 [```authHelper.js/redirect_uri```](authHelper.js#L9)

必要條件
* [```節點```](https://nodejs.org/en/) -建置於 Chrome V8 上的 JavaScript 執行階段
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) -節點封裝管理員

若要執行應用程式，請在您的命令列上輸入下列文字：

1. ```npm install``` - 安裝應用程式相依性
2. ```npm start``` - 啟動應用程式伺服器


## 在您的瀏覽器中啟動應用程式
一旦應用程式伺服器已成功啟動，開啟您最喜愛的網頁瀏覽器並前往 ```http://localhost:3000```

## 問題與意見

我們很樂於收到您對於 Office 365 Node.js Connect 範例的意見反應。您可以在此儲存機制的[問題](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues)區段中，將您的問題及建議傳送給我們。

請在 [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph) 提出有關 Office 365 開發的一般問題。務必以 [Office365] 和 [MicrosoftGraph] 標記您的問題或意見。
  
## 其他資源

* [Office 365 API 平台概觀](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Office 365 API 入門](http://dev.office.com/getting-started/office365apis)
* [Microsoft Graph 概觀](http://graph.microsoft.io)
* [Office 365 API 入門專案和程式碼範例](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI 結構](https://github.com/OfficeDev/Office-UI-Fabric)

## 著作權
Copyright (c) 2016 Microsoft.著作權所有，並保留一切權利。


