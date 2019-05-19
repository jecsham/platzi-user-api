(function () {
    const loadJson = () => {
        const jsonData = `
        {
            "status": {
                "error": false,
                "code": 200
            },
            "userData": {
                "socials": [
                    {
                        "type": "twitter",
                        "id": "311586158"
                    }
                ],
                "careers": [
                    {
                        "id": 42,
                        "title": "Arquitectura Frontend",
                        "logo": "https://static.platzi.com/media/career-banner/badge-arquitecto-frontend.png",
                        "golden_achievement": "https://static.platzi.com/media/achievements/Golden-badge-arquitecto-front.png",
                        "diploma_link": "/@jecsham/carrera/42-arquitecto/diploma/detalle/",
                        "active": true
                    },
                    {
                        "id": 56,
                        "title": "Fundamentos de Programación",
                        "logo": "https://static.platzi.com/media/career-banner/badge-carrera-fundamentos.png",
                        "golden_achievement": "https://static.platzi.com/media/achievements/golden-badge-carrera-fundamentos-5ca96131-7819-4349-be68-90edc3a7ee09.png",
                        "diploma_link": "/@jecsham/carrera/56-fundamentos-programacion/diploma/detalle/",
                        "active": true
                    }
                ],
                "courses": [
                    {
                        "id": 1380,
                        "title": "Curso Básico de Node.js",
                        "badge": "https://static.platzi.com/media/achievements/badge-basico-nodejs-331c5be0-b49a-4f8c-9263-900e61b95479.png",
                        "url": "/clases/basico-nodejs/",
                        "career": "Desarrollo con JavaScript",
                        "deprecated": false,
                        "diploma_link": "/@jecsham/curso/1380-basico-nodejs/diploma/detalle/"
                    },
                    {
                        "id": 1189,
                        "title": "Curso de Algoritmos con C",
                        "badge": "https://static.platzi.com/media/achievements/badge-algoritmos-ad65b237-2c3f-4921-9f5f-8e9d0ce24f15.png",
                        "url": "/clases/algoritmos/",
                        "career": "Fundamentos de Programación",
                        "deprecated": false,
                        "diploma_link": "/@jecsham/curso/1189-algoritmos/diploma/detalle/"
                    },
                    {
                        "id": 1103,
                        "title": "Curso de Animaciones para la Web",
                        "badge": "https://static.platzi.com/media/achievements/badge-animaciones-para-web.png",
                        "url": "/clases/animaciones-web/",
                        "career": "Arquitectura Frontend",
                        "deprecated": false,
                        "diploma_link": "/@jecsham/curso/1103-animaciones-web/diploma/detalle/"
                    },
        
                    ...
        
                ],
                "inactive_courses": [],
                "contributions": [
                    {
                        "id": 2765,
                        "title": "Compilando C/C++ desde Visual Studio Code | Windows 10",
                        "created_at": "2018-08-17T09:38:09.840322Z",
                        "n_stars": 5,
                        "n_responses": 3,
                        "detail_url": "/tutoriales/1189-algoritmos/2765-compilando-cc-desde-visual-studio-code-windows-10/",
                        "course_name": "Curso de Algoritmos con C"
                    },
                    {
                        "id": 2860,
                        "title": "Solución 2 a \"javac\" no se reconoce el comando | Windows 10",
                        "created_at": "2018-09-13T16:37:19.470377Z",
                        "n_stars": 2,
                        "n_responses": 1,
                        "detail_url": "/tutoriales/1222-java-basico/2860-solucion-2-a-javac-no-se-reconoce-el-comando-windows-10/",
                        "course_name": "Curso Básico de Java SE"
                    }
                ],
                "username": "jecsham",
                "avatar": "https://static.platzi.com/media/avatars/avatars/jecsham_00455714-2a56-4444-a531-492a5f863eb6.png",
                "description": "Fullstack Developer",
                "flag": "https://static.platzi.com/media/flags/PA.png",
                "last_update": "2018-12-06T16:00:02.144Z",
                "name": "Jecsham Castillo",
                "platzi_rank": "6.723",
                "profile_url": "https://platzi.com/@jecsham/",
                "website": "https://jecsham.com"
            }
        }`;
        const jsonContainer = document.getElementById("json-container");
        jsonContainer.append(jsonData);
    }
    loadJson();
})();
