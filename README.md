# Trabajo Práctico Final - Visualización de Datos - LTD - Universidad Torcuato Di Tella

## Spotify Cassettes 📼

### Integrantes

- [Tomas Glauberman]()
- [Luca Mazzarello]()
- [Ignacio Pardo]()

### Descripción

El objetivo de este trabajo es realizar un dashboard interactivo que permita visualizar la información de las canciones más escuchadas en Spotify en un periodo dado. Para ello, se utilizaron los datos de la API de Spotify y se creó una página web en React. El componente `Cassette` esta basado en el del [siguiente Codepen](https://codepen.io/RaduBratan/pen/MWyKrRZ).

### Demo

El proyecto se encuentra deployado en [Replit](https://www.replit.com/) y se puede acceder a través del siguiente [link](https://spotify-cassettes.ignaciopardo.repl.co/app). Tambien hay una versión corriendo en [Vercel](https://vercel.com/) que se puede acceder a través del siguiente [link](https://spotify-cassettes.vercel.app/) pero que no tiene la funcionalidad de iniciar sesión con Spotify.

### Instrucciones

Para correr el proyecto localmente, se debe primero clonar el repositorio, crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    CLIENT_ID
    CLIENT_SECRET

Para luego correr los siguientes comandos:

    npm install

    # para correr el proyecto de React (sin permitir iniciar sesión con Spotify)
    npm run start

    # O bien
    npm run dev # para correr el servidor de Node (permitiendo iniciar sesión con Spotify)

Para compilar SASS se puede activar el watcher en modo desarrollo con el siguiente comando:

    scss --watch src/App.scss:src/App.css

### Estructura del proyecto


```bash
cassettes
├── .env                   - Archivo de variables de entorno
├── .git                   - Directorio de archivos de Git
├── README.md              - Archivo de documentación
├── config-overrides.js    - Archivo de configuración personalizada
├── package.json           - Archivo de configuración de paquetes npm
├── package-lock.json      - Archivo generado por npm para versiones específicas de paquetes
├── node_modules           - Directorio que contiene los módulos de Node.js instalados
├── public                 - Directorio de archivos públicos accesibles desde el navegador
│   ├── 192.png            - Icono de la aplicación
│   ├── 512.png            - Icono de la aplicación
│   ├── favicon.ico        - Icono de la aplicación
│   ├── logo192.png        - Icono de la aplicación
│   ├── logo512.png        - Icono de la aplicación
│   ├── audios             - Directorio de archivos de audio
│   │   ├── Hablando a Tu Corazon.mp3
│   │   ├── No Voy en Tren.mp3
│   │   ├── Promesas Sobre El Bidet.mp3
│   │   ├── La Grasa de las Capitales.mp3
│   │   ├── Nos Siguen Pegando Abajo.mp3
│   │   └── sounds         - Directorio de archivos de sonido adicionales
│   │       ├── click.mp3
│   │       ├── click.ogg
│   │       ├── fforward.mp3
│   │       ├── fforward.ogg
│   │       ├── license.txt
│   │       ├── rewind.mp3
│   │       ├── rewind.ogg
│   │       ├── switch.mp3
│   │       └── switch.ogg
│   ├── cover.png          - Imagen de portada del casete
│   ├── icons              - Directorio de archivos de iconos
│   │   ├── forwardIcon.svg
│   │   ├── play_pauseIcon.svg
│   │   ├── rewindIcon.svg
│   │   └── stopIcon.svg
│   ├── index.html         - Punto de entrada de la aplicación React
│   ├── manifest.json      - Archivo de configuración de la aplicación web
│   └── robots.txt
├── src                    - Directorio de archivos fuente del proyecto
│   ├── App.scss           - Archivo de estilos de la aplicación React (SASS)
│   ├── App.css            - Archivo de estilos de la aplicación React (CSS)
│   ├── App.css.map
│   ├── App.js             - Componente principal de la aplicación React
│   ├── cassettes.json     - Archivo JSON de datos de casetes
│   ├── cassettes_chona.json    - Archivo JSON de datos de casetes
│   ├── cassettes_gesa.json     - Archivo JSON de datos de casetes
│   ├── cassettes_luca.json     - Archivo JSON de datos de casetes
│   ├── components         - Directorio de componentes React
│   │   ├── Cassette.js                     - Cassette
│   │   ├── CassetteGallery.js              - Galería de cassettes
│   │   ├── BrandLogoByFeatures.js          - Logo de marca por features de canción
│   │   ├── CassetteAnatomy.js              - Anatomía de un cassette (modal)
│   │   ├── DownloadDataButton.js           - Botón de descarga de datos (no implementado)
│   │   ├── GenerateSocialMediaPost.js      - Botón de generación de posteo en redes sociales
│   │   ├── LoadingOverlay.js               - Overlay de carga (mientras se obtienen los datos)
│   │   ├── MenuBar.js                      - Barra de menú
│   │   ├── TimeRangeSelector.js            - Selector de rango de tiempo
│   │   ├── PlayerControls.js               - Controles del reproductor
│   │   ├── PlayerIcon.js                   - Iconos de los controles del reproductor
│   │   ├── SongInfoDisplay.js              - Display de información de canción
│   │   ├── PlotComponent.js                - Componente de gráfico (Observable Plot)
│   │   ├── PlotModal.js                    - Modal de gráfico
│   │   ├── arrows                          - Directorio de componentes de flechas
│   │   ├── cover_colors.png                - Imagen de colores de portada
│   │   ├── cover.png                       - Imagen de portada
│   │   └── sounds                          - Directorio de archivos de sonido (ver public/audios)
│   ├── data               - Directorio de datos
│   ├── defaultSongs.js    - Archivo de canciones predeterminadas
│   ├── handleAccessTokenError.js   - Archivo de manejo de errores de acceso a Spotify
│   ├── index.css          - Archivo de estilos de la aplicación React (Boilerplate)
│   ├── index.js           - Punto de entrada de la aplicación React
│   ├── reportWebVitals.js - Archivo para informar sobre el rendimiento de la aplicación
│   ├── routes             - Directorio de rutas
│   ├── server copy.js     - Copia de seguridad del archivo del servidor
│   ├── server.js          - Archivo del servidor Express
│   ├── setupTests.js      - Archivo de configuración de pruebas
│   ├── spotify.js         - Archivo relacionado con Spotify API
│   └── utils.js           - Archivo de utilidades
└── build                  - Directorio de archivos generados en el proceso de compilación
```

### Herramientas utilizadas

- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [Express](https://expressjs.com/)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Observable Plot](https://observablehq.com/@observablehq/plot)
- [SASS](https://sass-lang.com/)
- [React Router](https://reactrouter.com/)

- [Figma](https://www.figma.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

- [Git](https://git-scm.com/)
- [GitHub](https://github.com/IgnacioPardo/Spotify-Cassettes)

- [Replit](https://replit.com/)
- [Vercel](https://vercel.com/)

### Licencia

[MIT]()

### Contacto

Tomas Glauberman - [tglauberman@mail.utdt.edu](mailto:tglauberman@mail.utdt.edu)
Luca Mazzarello - [lmazzarello@mail.utdt.edu](mailto:lmazzarello@mail.utdt.edu)
Ignacio Pardo - [ipardo@mail.utdt.edu](mailto:ipardo@mail.utdt.edu)
