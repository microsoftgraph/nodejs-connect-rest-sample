# 使用 Microsoft Graph 的 Office 365 Node.js Connect 示例
[![Build Status](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect.svg?branch=master)](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect)

连接到 Office 365 是每个应用开始使用 Office 365 服务和数据必须采取的第一步。该示例演示如何通过 Microsoft Graph API（旧称 Office 365 统一 API）连接并调用终结点，以及如何使用 Office 结构 UI 创建 Office 365 体验。

尝试 [Office 365 API 入门](http://dev.office.com/getting-started/office365apis?platform=option-node#setup)页面，其简化了注册，使您可以更快地运行该示例。

![Office 365 Node.js Connect 示例的屏幕截图](../readme-imgs/screenshot.PNG)
> 注意：要深入查看在 Node.js 应用中调用 Microsoft Graph API 的代码，请参阅[使用 Node.js 应用调用 Microsoft Graph](https://graph.microsoft.io/docs/platform/nodejs)。

## 先决条件

要使用 Office 365 Node.js Connect 示例，您需要以下内容：
* Office 365 帐户。您可以注册 [Office 365 开发人员订阅](https://aka.ms/devprogramsignup)，其中包含开始构建 Office 365 应用所需的资源。

     > **注意：**
     如果您已经订阅，之前的链接会将您转至包含以下信息的页面：*抱歉，您无法将其添加到当前帐户*。在这种情况下，请使用当前 Office 365 订阅中的帐户。<br /><br />
     如果您已经登录了 Office 365，之前链接中的登录按钮将显示以下信息：*抱歉，我们无法处理您的请求*。在这种情况下，请注销同一页面中的 Office 365 并重新登录。
* 用于注册您的应用程序的 Microsoft Azure 租户。Azure Active Directory (AD) 为应用程序提供了用于进行身份验证和授权的标识服务。您还可在此处获得试用订阅：[Microsoft Azure](https://account.windowsazure.com/SignUp)。

     > **重要信息：**
     您还需要确保您的 Azure 订阅已绑定到 Office 365 租户。要执行这一操作，请参阅 Active Directory 团队的博客文章：[创建和管理多个 Microsoft Azure Active Directory](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx)。**添加新目录**一节将介绍如何执行此操作。您还可以参阅[设置 Office 365 开发环境](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription)和**关联您的 Office 365 帐户和 Azure AD 以创建并管理应用**一节获取详细信息。
* 在 Azure 中注册的应用程序的客户端 ID、客户端密码和重定向 URI 值。必须向该示例应用程序授予**以登录用户身份发送邮件**权限以使用 **Microsoft Graph**。[在 Azure 中添加 Web 应用程序](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp)并向其[授予适当的权限](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure)。

     > **注意：**
     在应用注册过程中，务必将 **http://localhost:3000/login** 指定为**登录 URL**。
     
* 在[配置和运行应用](#configure-and-run-the-app)一节中咨询平台特定的必备项。

## 配置并运行应用

1. 通过应用程序的客户端 ID 更新 [```authHelper.js/client_id```](authHelper.js#L7)
2. 通过应用程序的客户端密码更新 [```authHelper.js/client_secret```](authHelper.js#L8)
3. 通过应用程序的重定向 URI 更新 [```authHelper.js/redirect_uri```](authHelper.js#L9)

先决条件
* [```node```](https://nodejs.org/en/) - 构建在 Chrome V8 上的 JavaScript 运行时
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) - 节点包管理器

要运行该应用，请在命令行键入以下命令：

1. ```npm install``` - 安装应用程序依存关系
2. ```npm start``` - 启动应用程序服务器


## 在浏览器中启动应用
启动应用程序服务器后，请将您收藏的 Web 浏览器打开到 ```http://localhost:3000```

## 问题和意见

我们乐意倾听您有关 Office 365 Node.js Connect 示例的反馈。您可以在该存储库中的[问题](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues)部分将问题和建议发送给我们。

与 Office 365 开发相关的问题一般应发布到[堆栈溢出](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph)。确保您的问题或意见使用了 [Office365] 和 [MicrosoftGraph] 标记。
  
## 其他资源

* [Office 365 API 平台概述](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Office 365 API 入门](http://dev.office.com/getting-started/office365apis)
* [Microsoft Graph 概述](http://graph.microsoft.io)
* [Office 365 API 初学者项目和代码示例](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI 结构](https://github.com/OfficeDev/Office-UI-Fabric)

## 版权
版权所有 (c) 2016 Microsoft。保留所有权利。


