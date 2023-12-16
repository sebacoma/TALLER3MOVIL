const router = require('express').Router();

const User = require('../models/user');

const Joi = require('@hapi/joi');

const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    rut: Joi.string().min(6).max(255).required(),
    date: Joi.string().min(6).max(255).required(),
    password: Joi.string(),
    verificationToken: Joi.string()
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})




//ruta a login :)
router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    console.log('jaja');

    //creamos el token 
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    console.log('jojo')

    res.header('auth-token', token).json({
        error: null,
        data: {
            token: token,
            message: 'Bienvenido'
        }
    })    
})

let cleanRut;

// Create transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // replace with your email provider
    auth: {
      user: 'sebastian.concha@alumnos.ucn.cl', // replace with your email
      pass: '06022001' // replace with your password
    }
  });

// Función para validar si el correo es de la UCN
function isValidUCNEmail(email) {
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/;
    return emailRegex.test(email);
}
// Función para validar el RUT con puntos y guión
function isValidRut(rut) {
    // Eliminar puntos y guiones del RUT
    cleanRut = rut.replace(/[.-]/g, '');
  
    // Separar el número del dígito verificador
    const rutNumber = cleanRut.slice(0, -1);
    const verificador = cleanRut.slice(-1).toUpperCase();
  
    // Verificar si el número es válido y calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
    for (let i = rutNumber.length - 1; i >= 0; i--) {
      suma += parseInt(rutNumber.charAt(i)) * multiplo;
      if (multiplo < 7) multiplo += 1;
      else multiplo = 2;
    }   
  
    const dvEsperado = 11 - (suma % 11);
  
    // Comparar el dígito verificador esperado con el proporcionado
    const digitoVerificador = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
    return digitoVerificador === verificador;
  }

// Función para validar si el RUT ya está registrado en la base de datos
async function isRutRegistered(rut) {
    try {
        const existingUser = await User.findOne({ rut: rut });
        return !!existingUser; // Devuelve true si el usuario existe, de lo contrario false
    } catch (error) {
        // Manejo de errores si ocurre algún problema con la base de datos
        console.error('Error al verificar si el RUT está registrado:', error);
        return false; // En caso de error, se asume que el RUT no está registrado
    }
}
router.post('/register', async (req, res) => {
    // Validaciones de usuario
    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Verificar si el correo electrónico ya está registrado en la base de datos
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Validar si el correo electrónico tiene el formato correcto y pertenece a los dominios específicos
    if (!isValidUCNEmail(req.body.email)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido para este dominio' });
    }

    //Validaciones para el rut 
    if (!isValidRut(req.body.rut)) {
        return res.status(400).json({ error: 'El RUT ingresado no es válido' });
    }
    const isRutExist = await isRutRegistered(req.body.rut);
    if (isRutExist) {
        return res.status(400).json({ error: 'El RUT ya está registrado' });
    }

    //hash contraseña, encripta la contraseña que por default es el rut, sin rut ni guion
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(cleanRut, salt);
    const verificationToken = (Date.now() / 1000).toString();

    console.log(verificationToken)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        rut: req.body.rut,
        date: req.body.date,
        password: password,
        verificationToken: verificationToken
    });

    try {
        const userDB = await user.save();

        // Send email to the new user
        let mailOptions = {
            from: 'mobile@hub.com',
            to: req.body.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking on the following link: http://192.168.86.63:3000/api/user/verify-email?token=${verificationToken}`
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.json({
            error: null,
            data: userDB
        });
    } catch (error) {
        res.status(400).json({ error: 'Hubo un error al guardar el usuario' });
    }


    
});

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid verification token' });
        }

        user.isVerified = true;
        user.verificationToken = 'verificado'; // remove the verification token
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying email' });
    }
});

// route to recover password

   

module.exports = router;
