import express from 'express'
import { router } from './routes/index.js'
import { db } from './config/db.js'

const app = express();

//conectar db

db.authenticate()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));



// Definir puerto
const port = process.env.PORT || 4000;

//Habilita PUG

app.set('view engine', 'pug')

app.use( (req, res, next) => {

    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombresitio = "Agencia de Viajes"
    return next()
})


// Definir carpeta publica

app.use(express.static('public'))

app.use('/', router);

//puerto 3306 root


app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
