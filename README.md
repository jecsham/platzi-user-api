# Platzi User API

[![Build Status](https://travis-ci.com/jecsham/platzi-user-api.svg?branch=master)](https://travis-ci.com/jecsham/platzi-user-api)

Platzi User API es una API no oficial de Platzi para obtener tus cursos y carreras aprobadas, aportes y más.

Los datos del usuario son consumidos por primera vez desde platzi.com (la extracción de datos puede tardar unos segundos), luego son guardados en una base de datos para que las próximas peticiones se consuman desde ahí. Dichos datos son actualizados si han pasado 24 horas desde la última actualización, en la próxima petición del usuario.

## Demo

Puedes ver un live preview en mi página web: [jecsham.com](https://jecsham.com/)

## Documentación

Puedes ver la documentación en: [platzi-user-api.jecsham.com](https://platzi-user-api.jecsham.com/)

## Desarrollo

¿Quieres contribuir? ¡Genial!

### Instalación
Primero que todo, debemos tener:
* [Node.js](https://nodejs.org/es/download/) 10.x (LTS)
* [MongoDB](https://www.mongodb.com/download-center/community) 4.0

Una vez hayamos hecho fork del proyecto y lo tengamos clonado en local, seguimos los siguientes pasos:
* Crea una nueva branch con el nombre de tu usuario desde la branch ```dev```.
* Inicia una instancia de MongoDB local o remoto.
* En el root del proyecto, crea un archivo llamado ```.env``` con el siguiente contenido:
    ```js
    PORT=3000
    MONGODB_URL='mongodb://<url-and-port>/platzi_api_userdata?retryWrites=true'
    ```
    Reemplaza ```<url-and-port>``` por la url y el puerto de la instancia de mongo.
* Ejecuta el comando:
    ```sh
    $ npm install
    ```
* Ejectua el comando: 
    ```sh
    $ npm test
    ``` 
    Este comando servirá para testear el proyecto y generar la base de datos ```platzi_api_userdata``` si esta no existe.
* Para iniciar la instancia de Node.js, utiliza: 
    ```sh
    $ npm run dev
    ```
    Con este comando podrás hacer cambios sin tener que reiniciar el servidor.

Adicionalmente utilizamos ```ESlint``` como linter, podremos usar los siguientes comandos:
* Para ver errores de reglas del código:
    ```sh
    $ npm run eslint
    ```
* Para corregirlos:
    ```
    $ npm run eslint:fix
    ```
### Pequeñas reglas a seguir:
* Código en inglés.
* Commits en inglés.
* Comentarios en inglés.

### Pull Request
Luego de haber hecho tus cambios, corre el comando:

```sh
$ npm run eslint && npm test
```
Y si este se ejecuta sin errores, podrás hacerle push a tu respositorio remoto, y desde github podrás crear el Pull Request a ```jecsham/dev```

### Integración Continua
Mientras esperas a que el Pull Request sea aceptado, Travis-CI creará builds con la finalidad de probar que el código funciona, si las builds fallan, no te asustes. Puedes continuar agregando commits al Pull Request hasta que las builds pasen con éxito. Pero lo ideal sería ejecutar el comando anterior para no tener problemas con Travis-CI :p

## Cursos recomendados
* [Fundamentos de JavaScript](https://platzi.com/clases/fundamentos-javascript/)
* [Introducción a Terminal y Línea de Comandos](https://platzi.com/clases/terminal/)
* [Curso profesional de Git y GitHub](https://platzi.com/clases/git-github/)
* [Curso de Expresiones Regulares](https://platzi.com/clases/expresiones-regulares/)
* [Curso Básico de Node.js](https://platzi.com/clases/basico-nodejs/)
* [Curso Básico de MongoDB](https://platzi.com/clases/mongodb/)

## License
----

MIT
