# Exemplo de conexão com o Office 365 para Node.js usando o Microsoft Graph
[![Build Status](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect.svg?branch=master)](https://travis-ci.org/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect)

A primeira etapa para que os aplicativos comecem a funcionar com dados e serviços do Office 365 é estabelecer uma conexão com essa plataforma. Este exemplo mostra como se conectar e chamar um único ponto de extremidade através da API do Microsoft Graph (antiga API unificada do Office 365) e usa o Office Fabric UI para criar uma experiência do Office 365.

Experimente a página [Introdução às APIs do Office 365](http://dev.office.com/getting-started/office365apis?platform=option-node#setup), que simplifica o registro para que você possa executar esse exemplo com mais rapidez.

![Captura de tela do exemplo de conexão com o Office 365 para Node.js](../readme-imgs/screenshot.PNG)
> Observação: Para ter uma visão detalhada do código de chamada da API do Microsoft Graph em um aplicativo Node.js, confira o artigo [Chamar o Microsoft Graph com um aplicativo Node.js](https://graph.microsoft.io/docs/platform/nodejs).

## Pré-requisitos

Para usar o exemplo de conexão com o Office 365 para Node.js, é necessário o seguinte:
* Uma conta do Office 365. Você pode se inscrever para [uma assinatura do Office 365 Developer](https://aka.ms/devprogramsignup), que inclui os recursos de que você precisa para começar a criar aplicativos do Office 365.

     > **Observação:**
     Caso já tenha uma assinatura, o link anterior direciona você para uma página com a mensagem *Não é possível adicioná-la à sua conta atual*. Nesse caso, use uma conta de sua assinatura atual do Office 365.<br /><br />
     Se você já entrou no Office 365, o botão Entrar no link anterior mostra a mensagem *Não é possível processar sua solicitação*. Nesse caso, saia do Office 365 nessa mesma página e entre novamente.
* Um locatário do Microsoft Azure para registrar o seu aplicativo. O Azure Active Directory (AD) fornece serviços de identidade que os aplicativos usam para autenticação e autorização. Você pode adquirir uma assinatura de avaliação aqui: [Microsoft Azure](https://account.windowsazure.com/SignUp).

     > **Importante:**
     Você também deve assegurar que a sua assinatura do Azure esteja vinculada ao seu locatário do Office 365. Para saber como fazer isso, confira a postagem de blog da equipe do Active Directory: [Criar e gerenciar vários Microsoft Azure Active Directory](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx). A seção **Adicionar um novo diretório** explica como fazer isso. Para saber mais, confira o artigo [Configurar o seu ambiente de desenvolvimento do Office 365](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription) e a seção **Associar a sua conta do Office 365 ao Azure AD para criar e gerenciar aplicativos**.
* Valores de uma ID do cliente, do segredo do cliente e do URI de redirecionamento de um aplicativo registrado no Azure. Esse exemplo de aplicativo deve ter a permissão **Enviar email como usuário conectado** concedida para o **Microsoft Graph**. Para isso, [adicione um aplicativo Web no Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp) e [conceda as permissões adequadas](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure).

     > **Observação:**
     Durante o processo de registro do aplicativo, não deixe de especificar **http://localhost:3000/login** como a **URL de Entrada**.
     
* Confira a seção [Configurar e executar o aplicativo](#configure-and-run-the-app) para ver os pré-requisitos específicos da plataforma.

## Configurar e executar o aplicativo

1. Atualize [```authHelper.js/client_id```](authHelper.js#L7) com a ID do cliente do aplicativo
2. Atualize [```authHelper.js/client_secret```](authHelper.js#L8) com o segredo do cliente do aplicativo
3. Atualize [```authHelper.js/redirect_uri```](authHelper.js#L9) com o URI de redirecionamento do aplicativo

Pré-requisitos
* [```node```](https://nodejs.org/en/) – tempo de execução do JavaScript criado no Chrome V8
* [```npm```](https://docs.npmjs.com/getting-started/installing-node) – Gerenciador de Pacotes de Nós

Para executar o aplicativo, digite o seguinte código na linha de comando:

1. ```npm install``` – instala as dependências do aplicativo
2. ```npm start``` – inicia o servidor do aplicativo


## Iniciar o aplicativo no seu navegador
Quando iniciar o servidor do aplicativo, abra o seu navegador favorito na página ```http://localhost:3000```

## Perguntas e comentários

Gostaríamos de saber sua opinião sobre o exemplo de conexão com o Office 365 para Node.js. Você pode enviar perguntas e sugestões na seção [Problemas](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) deste repositório.

As perguntas sobre o desenvolvimento do Office 365 em geral devem ser postadas no [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Não deixe de marcar as perguntas ou comentários com [Office365] e [MicrosoftGraph].
  
## Recursos adicionais

* [Visão geral da plataforma de APIs do Office 365](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Introdução às APIs do Office 365](http://dev.office.com/getting-started/office365apis)
* [Visão geral do Microsoft Graph](http://graph.microsoft.io)
* [Exemplos de código e projetos iniciais de APIs do Office 365](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Direitos autorais
Copyright © 2016 Microsoft. Todos os direitos reservados.


