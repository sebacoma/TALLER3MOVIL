const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

// Capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const corsOptions = {
    origin: ['http://192.168.86.63', 'http://localhost:8100'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios móviles) no envían el código 204
};
app.use(cors(corsOptions));

// Conexión a Base de datos
const uri = `mongodb+srv://sebacomaia:2NCYNO05z9rJn3cV@cluster0.dfrzdkk.mongodb.net/DWM?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

// Importar rutas 
const authRoutes = require('./routes/auth');
const repoInfoRoute = require('./routes/githubRoutes'); // Asegúrate de que la ruta del archivo sea correcta

// Route middlewares
app.use('/api/user', authRoutes);
app.use('/api/github', repoInfoRoute); // Montar la ruta de GitHub bajo /api/github

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

const PORT = 3000;
const HOST = '192.168.86.63';
app.listen(PORT, HOST, () => {
    console.log(`El servidor está corriendo en http://${HOST}:${PORT}`);
});
