let NeDB = require('nedb'); //carrega o modulo nedb
let db = new NeDB({ //cria o banco de dados
    filename:'users.db', // cria o arquivo que será salva no banco
    autoload:true
});

module.exports = function(app){ // exporta toda a informação desse arquivo pra quem chamar .routes em outro arquivo.

    let route = app.route('/users');

    route.get((req, res)=>{

        db.find({}).sort({name:1}).exec((err, users)=>{

            if(err) {
                app.Utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users                    
                });
            }
        });            
    });
    
    route.post((req, res) => {
 
        req.assert('name', 'O nome é obrigatório').notEmpty();
        req.assert('email', 'O e-mail está inválido.').notEmpty().isEmail();
 
        let erros = req.validationErrors()
 
        if (erros) {
 
            app.utils.error.send(erros, req, res)
            return false
 
        }
        
        db.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(user)
            }
        });
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res)=>{

        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if (err) {
                app.Utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        });
    });
    routeId.put((req, res)=>{

        db.update({_id:req.params.id}, req.body, err => {
            if (err) {
                app.Utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }

        });
    });

    routeId.delete((req, res)=>{

        db.remove({_id:req.params.id}, {}, err=>{

            if (err) {
                app.Utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }
        });
    });
};