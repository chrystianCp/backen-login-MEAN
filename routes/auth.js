const { Router } = require('express');
const {check} = require('express-validator');
const { 
        crearUsuario,
        loginUsuario,
        renewToken
} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//crear usuario
router.post('/new', [
    // check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La password es obligatoria').isLength({min: 6}),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos    
], crearUsuario );

//login usuario
router.post('/login', [    
    check('email','El email es obligatorio').isEmail(),
    check('password','La password es obligatoria').isLength({min: 6}),
    validarCampos
], loginUsuario );


router.get('/renew', [validarJWT], renewToken );

module.exports = router;