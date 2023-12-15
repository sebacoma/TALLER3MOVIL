const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require("cors");

require('dotenv').config()


const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const corsOptions = {
    origin: ['http://192.168.1.92', 'http://localhost:8100'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios móviles) no envían el código 204
  };
  
  app.use(cors(corsOptions));
  
// Conexión a Base de datos
const uri =`mongodb+srv://sebacomaia:2NCYNO05z9rJn3cV@cluster0.dfrzdkk.mongodb.net/DWM?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri,option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// importar rutas 
const authRoutes = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoutes);


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

const PORT = 3000;
const HOST = '192.168.1.92'; 
app.listen(PORT, HOST, () => {
    console.log(`El servidor está corriendo en http://${HOST}:${PORT}`);
  });