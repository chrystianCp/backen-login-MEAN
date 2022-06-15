const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {
        const {uid, email,role} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.email = email;       
        req.role = role;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }





}

module.exports = {
    validarJWT
}