# Ejemplo Connect de Node.js para Office 365 con Microsoft Graph
![Build Status](https://ricalo.visualstudio.com/_apis/public/build/definitions/06256fa7-d8e5-4ca0-8639-7c00eb6f1fe9/10/badge "Build Status")

Conectarse a Office 365 es el primer paso que debe realizar cada aplicación para empezar a trabajar con los datos y servicios de Office 365. Este ejemplo muestra cómo conectar y cómo llamar después a un punto de conexión mediante la API de Microsoft Graph (anteriormente denominada API unificada de Office 365) y usa la interfaz de usuario Fabric de Office para crear una experiencia de Office 365.

Consulte [Introducción a las API de Office 365](http://dev.office.com/getting-started/office365apis?platform=option-node#setup), que simplifica el registro para que este ejemplo se ejecute más rápidamente.

![Captura de pantalla del ejemplo Connect de Node.js para Office 365](../readme-imgs/screenshot.PNG)
> Nota: Para realizar un análisis exhaustivo del código para llamar a la API de Microsoft Graph en una aplicación de Node.js, consulte [Llamar a Microsoft Graph con una aplicación de Node.js](https://graph.microsoft.io/docs/platform/nodejs).

## Requisitos previos

Para usar el ejemplo Connect de Node.js para Office 365, necesita lo siguiente:
* Una cuenta de Office 365. Puede registrarse para obtener [una suscripción a Office 365 Developer](https://aka.ms/devprogramsignup), que incluye los recursos que necesita para empezar a compilar aplicaciones de Office 365.

     > **Nota:**
     Si ya dispone de una suscripción, el vínculo anterior le dirige a una página con el mensaje *No se puede agregar a su cuenta actual*. En ese caso, use una cuenta de su suscripción actual a Office 365.<br /><br />
     Si ya inició sesión en Office 365, el botón de inicio de sesión del vínculo anterior muestra el mensaje *No podemos procesar su solicitud*. En ese caso, cierre sesión en Office 365 en esa misma página y vuelva a iniciarla.
* Un inquilino de Microsoft Azure para registrar la aplicación. Azure Active Directory (AD) proporciona servicios de identidad que las aplicaciones usan para autenticación y autorización. Puede adquirir una suscripción de prueba aquí: [Microsoft Azure](https://account.windowsazure.com/SignUp).

     > **Importante:**
     También necesita asegurarse de que su suscripción de Azure está enlazada a su inquilino de Office 365. Para ello, consulte la publicación del blog del equipo de Active Directory, [Crear y administrar varios directorios de Windows Azure Active Directory](http://blogs.technet.com/b/ad/archive/2013/11/08/creating-and-managing-multiple-windows-azure-active-directories.aspx). La sección **Agregar un nuevo directorio** le explicará cómo hacerlo. Para obtener más información, también puede consultar [Configurar el entorno de desarrollo de Office 365](https://msdn.microsoft.com/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription) y la sección **Asociar su cuenta de Office 365 con Azure AD para crear y administrar aplicaciones**.
* Los valores de identificador de cliente, secreto de cliente y URI de redireccionamiento de una aplicación registrada en Azure. A esta aplicación de ejemplo se le debe conceder el permiso **Enviar correo como usuario con sesión iniciada** para **Microsoft Graph**. [Agregar una aplicación web en Azure](https://msdn.microsoft.com/office/office365/HowTo/add-common-consent-manually#bk_RegisterWebApp) y [concederle los permisos adecuados](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/wiki/Grant-permissions-to-the-Connect-application-in-Azure).

     > **Nota:**
     Durante el proceso de registro de la aplicación, asegúrese de especificar **http://localhost:3000/login** como **Dirección URL de inicio de sesión**. 
     
* Consulte la sección [Configurar y ejecutar la aplicación](#configure-and-run-the-app) para ver los requisitos previos específicos de la plataforma.

## Configurar y ejecutar la aplicación

1. Actualizar [```authHelper.js/client_id```](authHelper.js#L7) con el identificador de cliente de la aplicación
2. Actualizar [```authHelper.js/client_secret```](authHelper.js#L8) con el secreto del cliente de la aplicación
3. Actualizar [```authHelper.js/redirect_uri```](authHelper.js#L9) con el URI de redireccionamiento de la aplicación

Requisitos previos
* [```nodo```](https://nodejs.org/en/): tiempo de ejecución de JavaScript basado en Chrome V8
* [```NPM```](https://docs.npmjs.com/getting-started/installing-node): Administrador de paquetes de nodos

Para ejecutar la aplicación, escriba lo siguiente en la línea de comandos:

1. ```npm install```: instala las dependencias de la aplicación
2. ```npm start```: inicia el servidor de aplicaciones


## Iniciar la aplicación en el explorador
Una vez iniciado el servidor de aplicaciones, abra su explorador web favorito en ```http://localhost:3000```

## Preguntas y comentarios

Nos encantaría recibir sus comentarios acerca del ejemplo Connect de Node.js para Office 365. Puede enviarnos sus preguntas y sugerencias a través de la sección [Problemas](https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect/issues) de este repositorio.

Las preguntas generales sobre desarrollo en Office 365 deben publicarse en [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+MicrosoftGraph). Asegúrese de que sus preguntas o comentarios se etiquetan con [Office365] y [MicrosoftGraph].
  
## Recursos adicionales

* [Información general sobre la plataforma de las API de Office 365](https://msdn.microsoft.com/office/office365/howto/platform-development-overview)
* [Introducción a las API de Office 365](http://dev.office.com/getting-started/office365apis)
* [Información general de Microsoft Graph](http://graph.microsoft.io)
* [Proyectos de inicio de las API de Office 365 y ejemplos de código](https://msdn.microsoft.com/office/office365/howto/starter-projects-and-code-samples)
* [Office UI Fabric](https://github.com/OfficeDev/Office-UI-Fabric)

## Copyright
Copyright (c) 2016 Microsoft. Todos los derechos reservados.


