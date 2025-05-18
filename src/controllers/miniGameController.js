var miniGameModel = require("../models/miniGameModel");

function listarLutadores(req, res) {
    miniGameModel.listarLutadores()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum lutador encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao listar lutadores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarLutadorPorId(req, res) {
    var idLutador = req.params.id;

    if (idLutador == undefined) {
        res.status(400).send("O ID do lutador está undefined!");
        return;
    }

    miniGameModel.buscarLutadorPorId(idLutador)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Lutador não encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar lutador: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function salvarDuelo(req, res) {
    var idUsuario = req.body.idUsuario;
    var idLutadorEscolhido = req.body.idLutadorEscolhido;
    var idLutadorSorteado = req.body.idLutadorSorteado;
    var resultado = req.body.resultado;

    if (!idUsuario || !idLutadorEscolhido || !idLutadorSorteado || !resultado) {
        res.status(400).send("Dados incompletos para salvar duelo.");
        return;
    }

    miniGameModel.salvarDuelo(idUsuario, idLutadorEscolhido, idLutadorSorteado, resultado)
        .then(() => {
            res.status(200).send("Duelo salvo com sucesso!");
        })
        .catch((erro) => {
            console.log("Erro ao salvar duelo: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarLutadores,
    buscarLutadorPorId,
    salvarDuelo
};
