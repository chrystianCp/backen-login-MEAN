const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //codigo nuevo//
    role: {
        type: String,
        requird: true,
        default: 'USER_ROLE'
    }
});

module.exports = model('Usuario', UsuarioSchema);