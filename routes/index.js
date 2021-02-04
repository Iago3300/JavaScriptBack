module.exports = app=>{ // exporta toda a informação desse arquivo pra quem chamar .routes em outro arquivo.
    
    app.get('/', (req, res)=>{  //cada app(routes).get é uma rota(uma url do seu site, / é o index padrão, o users é outra rota)

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Olá</1>');
    
    });
    
};