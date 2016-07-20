# Microsoft Graph を使った Office 365 Node.js Connect サンプル
[![Build Status](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect.svg?branch=master)](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect)

各アプリで Office 365 のサービスとデータの操作を開始するため、最初に Office 365 に接続する必要があります。このサンプルでは、Microsoft Graph API (以前は Office 365 統合 API と呼ばれていた) を介して 1 つのエンドポイントに接続して呼び出す方法を示し、Office Fabric UI を使って Office 365 エクスペリエンスを作成します。

このサンプルをより迅速に実行するため、「[Office 365 API を使う](http://dev.office.com/getting-started/office365apis?platform=option-node#setup)」ページに記載された登録の簡略化をお試しください。

![Office 365 Node.js Connect サンプルのスクリーンショット](../readme-imgs/screenshot.PNG)
> 注:Node.js アプリで Microsoft Graph API を呼び出すためのコードについて詳しくは、「[Node.js アプリで Microsoft Graph を呼び出す](https://graph.microsoft.io/docs/platform/nodejs)」をご覧ください。

## 前提条件

Office 365 Node.js Connect サンプルを使うには、次のものが必要です。
* Office 365 アカウント。[Office 365 Developer](https://aka.ms/devprogramsignup) サブスクリプションにサイン アップすることができます。ここには、Office 365 アプリのビルドを開始するために必要なリソースが含まれています。

     > **注:**
     サブスクリプションが既に存在する場合、上記のリンクをクリックすると、*申し訳ありません、現在のアカウントに追加できません* と表示されたページに移動します。その場合は、現在使用している Office 365 サブスクリプションのアカウントをご利用いただけます。<br /><br />
     Office 365 にすでにサインインしている場合、上記のリンクの [サインイン] ボタンに、*申し訳ございません。お客様のリクエストを処理できません。* というメッセージが表示されます。その場合、その同じページで Office 365 からサインアウトし、その後もう一度サインインしてください。
* アプリケーションを登録する Microsoft Azure テナント。Azure Active Directory (AD) は、アプリケーションが認証と承認に使用する ID サービスを提供します。試用版サブスクリプションは、[Microsoft Azure](https://account.windowsazure.com/SignUp) で取得できます。

     > **重要事項:**
     Azure サブスクリプションが Office 365 テナントにバインドされていることを確認する必要があります。確認するには、Active Directory チームのブログ投稿「[複数の Windows Azure Active Directory を作成および管理する](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx)」を参照してください。「**新しいディレクトリを追加する**」セクションで、この方法について説明しています。また、詳細については、「[Office 365 開発環境をセットアップする](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription)」や「**Office 365 アカウントを Azure AD と関連付けてアプリを作成および管理する**」セクションも参照してください。
* Azure に登録されたアプリケーションのクライアント ID、クライアント シークレット、およびリダイレクト URI の値。このサンプル アプリケーションには、**Microsoft Graph** の**サインインしているユーザーとしてメールを送信する**アクセス許可を付与する必要があります。[Azure に Web アプリケーションを追加](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp)し、[適切なアクセス許可を付与](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure)します。

     > **注:**
     アプリ登録プロセス時に、**サインオン URL** として **http://localhost:3000/login** を必ず指定します。
     
* プラットフォーム固有の前提条件については、「[アプリの構成と実行](#configure-and-run-the-app)」セクションをご覧ください。

## アプリの構成と実行

1. アプリケーションのクライアント ID による [```authHelper.js/client_id```](authHelper.js#L7) の更新
2. アプリケーションのクライアント シークレットによる [```authHelper.js/client_secret```](authHelper.js#L8) の更新
3. アプリケーションのリダイレクト URI による [```authHelper.js/redirect_uri```](authHelper.js#L9) の更新

前提条件
* [```ノード```](https://nodejs.org/en/) - Chrome V8 でビルドされた JavaScript ランタイム
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) - ノード パッケージ マネージャー

アプリを実行するには、コマンド ラインに次を入力します。

1. ```npm install``` - アプリケーションの依存関係をインストールする
2. ```npm start``` - アプリケーション サーバーを起動する


## ブラウザーでアプリケーションを起動する
アプリケーション サーバーを起動すると、任意の Web ブラウザーが ```http://localhost:3000``` に表示されます

## 質問とコメント

Office 365 Node.js Connect サンプルについて、Microsoft にフィードバックをお寄せください。質問や提案につきましては、このリポジトリの「[問題](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues)」セクションに送信できます。

Office 365 開発全般の質問につきましては、「[スタック オーバーフロー](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph)」に投稿してください。質問またはコメントには、必ず [Office365] および [MicrosoftGraph] のタグを付けてください。
  
## その他の技術情報

* [Office 365 API プラットフォームの概要](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Office 365 API を使う](http://dev.office.com/getting-started/office365apis)
* [Microsoft Graph の概要](http://graph.microsoft.io)
* [Office 365 API スタート プロジェクトおよびサンプル コード](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office の UI ファブリック](https://github.com/OfficeDev/Office-UI-Fabric)

## 著作権
Copyright (c) 2016 Microsoft. All rights reserved.


