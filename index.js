const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use( express.static('public'));

app.use(cors());

app.use( express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//manage routes
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () =>  {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});