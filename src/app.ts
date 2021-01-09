import express from 'express';
import bodyParser from 'body-parser';
import {publicKey} from './publicKey';
// import winston from 'winston';
import {logger} from './utils/logger';

const app = express();
const port = 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/publicKey', (req, res) => {
  res.json(publicKey);
});



app.post('/checkValues', (req, res) => {
    let bodyReq = req.body;
    let respuesta;

    let name = bodyReq.name;
    let docCrypt = bodyReq.docCrypt;


    
    if (!name || !docCrypt) {
        respuesta = {
            ok: false,
            mensaje: '¡DATOS INCORRECTOS!'
        };
        res.json(respuesta);
        // console.log(`Request: ${req.url}, Response: ${res.statusMessage}`);
    }else{
        respuesta = {
            ok: true,
            mensaje: '¡DATOS RECIBIDOS!'
        };
        res.json(respuesta);
    }
     
    
    let logmsg = {
        'Method': req.method,
        'URL': req.originalUrl,
        'reqBody': req.body,
        'res': res.statusMessage,
        'statusCode': res.statusCode,
        'resContent': respuesta        
    };
    
    // logger.info(bodyReq);
    // logger.info(respuesta);
    logger.log('info',logmsg);

});


app.listen(port, ()=> console.log(`El servidor está escuchando por el puerto ${port}`  ) );
