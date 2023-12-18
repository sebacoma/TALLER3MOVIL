## Configuración del Backend

### Requisitos Previos
- Node.js instalado
- Gestor de base de datos MongoDB instalado y configurado

### Pasos para configurar el Backend
1. Clona este repositorio en tu computadora.
2. Ve al directorio del backend `cd backend`.
3. instala las dependencias  usando npm install @hapi/joi @octokit/rest bcrypt body-parser cors crypto-random-string dotenv express jsonwebtoken mongodb mongoose nodemailer
4. Ejecuta el servidor backend con el comando `node index.js"

## Configuración del Frontend
### Requisitos Previos
- Node.js instalado
- Ionic CLI instalado globalmente (`npm install -g @ionic/cli`)

### Pasos para configurar el Frontend
1. Ve al directorio del frontend `cd frontend`.
2. Instala las dependencias usando npm install -g @capacitor/cli despues has npm install axios
3. Asegúrate de tener el servidor backend en ejecución antes de iniciar el frontend.
4. Configura la URL del servidor backend en los archivos de configuración si es necesario.
- en este apartado, cuando ya hayas corrido el backend, en la terminal te dira en que puerto esxactamente esta corriendo, vas a copiar la direccion, y la vas a pegar en las rutas de nuestros archivos ".vue", pero solo en la parte del "http://000.00.00.00:3000" y todo lo demas va, de la carpeta src/views
5. Ejecuta la aplicación frontend con el comando `ionic serve`.


### adicional 

para probar el backend sin front, se ha utilizado postman, tu puedes descargarlo y hacer las pruebas tu mismo. (taller3.postman_collection.json aca esta la evidencia de como utilizarlo, nuevamente para usarlo tendras que cambiar la direccion de tu backend) 


para conumir la api de github puede que tengas problemas con el token que esta en la carpeta backend, el archivo githubRoutes.js, para solucionar esto solo basta con que tu generes el token de tu github personal, en settings, settings developers ...