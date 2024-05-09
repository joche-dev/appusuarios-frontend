
# APP de Usuarios
La aplicacion cuenta con un dashboard que permite crear, leer, actualizar y eliminar usuarios. La aplicación es responsiva y compatible con diferentes dispositivos y tamaños de pantalla. Conectada a la siguiente API RESTful: [🔗 appusuarios-backend.onrender.com/users](https://appusuarios-backend.onrender.com/users)


**Stack:** ReactJs, Bootstrap, JavaScript, Toastify. 
## Run Locall

#### Clone the project
```bash
  git clone https://github.com/joche-dev/appusuarios-frontend.git
```

#### Go to the project directory
```bash
  cd appusuarios-frontend
```

#### Install dependencies
```bash
  npm install
```
#### Variables
To run this project, you will need to verify or modify the variable that connects to the Restful API located in the UserProvider file.
```Javascript
  const URL_BASE='https://appusuarios-backend.onrender.com'
```

#### Start the server
```bash
  npm run dev
```