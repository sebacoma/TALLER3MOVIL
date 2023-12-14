const mongoose = require('mongoose');
// esquema usuario
const userSchema = mongoose.Schema({
    name: { // aca seguimos las indicaciones del enunciado, min 10 y max 150
        type: String,
        required: true,
        min: 10,
        max: 150 
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    rut: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        required: true
    },
    password: {
        type :String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);
