const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res) => {
            
    const { /*name,*/email, password,role } = req.body;

    try {
        //unique email
        const usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya tiene una cuenta'
            });
        }
        //create user with schema
        const dbUser = new Usuario(req.body);
        //hash
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        //jwt
        const token = await generarJWT(dbUser.id, email,role);
        //crear usuario db
        await dbUser.save();
        //res 200
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            email,
            role,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }    
   


    
}

const loginUsuario = async(req , res) => {
    const {email, password} = req.body;

    try {
        const dbUser = await Usuario.findOne({email});

        if(!dbUser){
            return res.status(401).json({
                ok: false,
                msg: 'credenciales invalidas'
            });
        }
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if(!validPassword){
            return res.status(401).json({
                ok: false,
                msg: 'credenciales invalidas'
            });
        }
        //generar jwt                             //name
        const token = await generarJWT(dbUser.id, email);
        //res
        return res.json({
            ok:true,
            uid: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,            
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }  
}

const renewToken = async(req , res) => {
                //name
    const { uid } = req;

    //leer db para obtener rol
    const dbUser = await Usuario.findById(uid);
    //generar jwt                       //name
    const token = await generarJWT(uid, dbUser.email);
        
    return res.json({
        ok: true,
        uid,
        email: dbUser.email,
        role: dbUser.role,        
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}