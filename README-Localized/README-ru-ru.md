# Пример приложения Node.js, подключающегося к Office 365 и использующего Microsoft Graph
[![Build Status](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect.svg?branch=master)](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect)

Подключение к Office 365 — это первый шаг, который должно выполнить каждое приложение, чтобы начать работу со службами и данными Office 365. В этом примере показано, как подключить и вызвать одну конечную точку с помощью API Microsoft Graph (прежнее название — единый API Office 365), а также использовать платформу Office UI Fabric для работы с Office 365.

Перейдите на страницу [Начало работы с API Office 365](http://dev.office.com/getting-started/office365apis?platform=option-node#setup) для упрощенной регистрации, чтобы ускорить запуск этого примера.

![Снимок экрана с примером приложения Node.js, подключающегося к Office 365](../readme-imgs/screenshot.PNG)
> Примечание. Подробное описание кода для вызова API Microsoft Graph в приложении Node.js см. в статье [Вызов Microsoft Graph с помощью приложения для Node.js](https://graph.microsoft.io/docs/platform/nodejs).

## Необходимые условия

Чтобы воспользоваться примером приложения Node.js, подключающегося к Office 365, требуются следующие компоненты:
* Учетная запись Office 365. Вы можете [подписаться на план Office 365 для разработчиков](https://aka.ms/devprogramsignup), включающий ресурсы, которые необходимы для создания приложений Office 365.

     > **Примечание.**
     Если у вас уже есть подписка, при выборе приведенной выше ссылки откроется страница с сообщением *К сожалению, вы не можете добавить это к своей учетной записи*. В этом случае используйте учетную запись, сопоставленную с текущей подпиской на Office 365.<br /><br />
     Если вы уже вошли в систему Office 365, на кнопке входа, отображенной после выбора предыдущей ссылки, появится сообщение *Невозможно обработать ваш запрос*. В этом случае выйдите из Office 365 на этой же странице и повторно выполните вход.
* Клиент Microsoft Azure для регистрации приложения. В Azure Active Directory (AD) доступны службы идентификации, которые приложения используют для проверки подлинности и авторизации. Здесь можно получить пробную подписку: [Microsoft Azure](https://account.windowsazure.com/SignUp).

     > **Важно!**
     Убедитесь, что ваша подписка на Azure привязана к клиенту Office 365. Для этого просмотрите запись в блоге команды Active Directory, посвященную [созданию нескольких каталогов Microsoft Azure AD и управлению ими](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx). Инструкции приведены в разделе о **добавлении нового каталога**. Дополнительные сведения см. в статье [Как настроить среду разработки для Office 365](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription) и, в частности, в разделе **Связывание Azure AD и учетной записи Office 365 для создания приложений и управления ими**.
* Универсальный код ресурса (URI) для перенаправления, секрет клиента и идентификатор клиента, указанные при регистрации приложения в Azure. Этому примеру приложения необходимо предоставить разрешение **Отправка почты от имени вошедшего пользователя** для **Microsoft Graph**. [Добавьте приложение в Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp) и [предоставьте ему необходимые разрешения](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure).

     > **Примечание.**
     При регистрации приложения укажите **http://localhost:3000/login** как значение параметра **URL-адрес входа**.
     
* Предварительные требования к платформе см. в разделе [Настройка и запуск приложения](#configure-and-run-the-app).

## Настройка и запуск приложения

1. Обновите [```authHelper.js/client_id```](authHelper.js#L7), используя идентификатор клиента приложения
2. Обновите [```authHelper.js/client_secret```](authHelper.js#L8), используя секрет клиента приложения
3. Обновите [```authHelper.js/redirect_uri```](authHelper.js#L9), используя универсальный код ресурса (URI) перенаправления для приложения

Необходимые условия
* [```узел```](https://nodejs.org/en/) — среда выполнения JavaScript, собранная в Chrome V8
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) — диспетчер пакета узла

Чтобы запустить приложение, введите в командную строку следующую команду:

1. ```npm install``` — установка зависимостей приложения;
2. ```npm start``` — запуск сервера приложений.


## Запуск приложения в браузере
После запуска сервера приложений введите в адресной строке выбранного браузера адрес ```http://localhost:3000```.

## Вопросы и комментарии

Мы будем рады получить от вас отзывы о примере приложения Node.js, подключающегося к Office 365. Вы можете отправлять нам вопросы и предложения в разделе [Issues](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) этого репозитория.

Общие вопросы о разработке решений для Office 365 следует публиковать на сайте [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Обязательно помечайте свои вопросы и комментарии тегами [Office365] и [MicrosoftGraph].
  
## Дополнительные ресурсы

* [Общие сведения о платформе API Office 365](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Начало работы с API Office 365](http://dev.office.com/getting-started/office365apis)
* [Обзор Microsoft Graph](http://graph.microsoft.io)
* [Проекты API Office 365 и примеры кода для начинающих](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Авторское право
(c) Корпорация Майкрософт (Microsoft Corporation), 2016. Все права защищены.


