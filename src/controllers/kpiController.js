var kpiModel = require("../models/kpiModel");

function obterLutadorMaisEscolhido(req, res){
    kpiModel.obterLutadorMaisEscolhido()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) =>{
            console.log("Erro ao exibir lutador mais escolhido: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    obterLutadorMaisEscolhido
}