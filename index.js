const express = require('express'); //Carrega o modulo express(Um framework que carrega o protocolo http junto)
const consign = require('consign'); //Modulo usado para carregar automaticamente modelos, rotas, esquemas, configurações, controladores, mapas de objetos, etc.
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express(); // A variavel app invoca o modulo express

app.use(bodyParser.urlencoded( { extented: false}));
app.use(bodyParser.json());
app.use(expressValidator());

consign().include('routes').include('Utils').into(app);//invoca o consign e pede pra incluir todos os arquivos do routes no app(express)

app.listen(3000, '127.0.0.1', ()=>{

    console.log('Servidor online!');

});