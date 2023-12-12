const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config()


const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


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

// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})