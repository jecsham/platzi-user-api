# Platzi User API

[![Build Status](https://travis-ci.com/jecsham/platzi-user-api.svg?branch=master)](https://travis-ci.com/jecsham/platzi-user-api)

Platzi User API es una API no oficial de Platzi para obtener tus cursos y carreras aprobadas, aportes y más.

Los datos del usuario son consumidos por primera vez desde platzi.com (la extracción de datos puede tardar unos segundos), luego son guardados en una base de datos para que las próximas peticiones se consuman desde ahí. Dichos datos son actualizados si han pasado 24 horas desde la última actualización, en la próxima petición del usuario.

## Demo

Puedes ver un live preview en mi página web: https://jecsham.com

## Documentación

Puedes ver la documentación en: https://platzi-user-api.jecsham.com/

## Desarrollo

¿Quieres contribuir? ¡Genial!

Platzi User API usa NodeJS y MongoDB.

*En construcción*

<!-- Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
``` -->

License
----

MIT
