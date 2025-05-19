var miniGameModel = require("../models/miniGameModel");

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

function graficoTaxaVitorias(req, res) {
    miniGameModel.taxaVitoriasUsuarios()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao obter taxa de vitórias: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoDistribuicaoResultados(req, res) {
    miniGameModel.distribuicaoResultados()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao obter distribuição de resultados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoLutadoresMaisEscolhidos(req, res) {
    miniGameModel.lutadoresMaisEscolhidos()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao obter lutadores mais escolhidos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoCombinacoesLutadores(req, res) {
    miniGameModel.combinacoesLutadoresMaisFrequentes()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao obter combinações de lutadores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    salvarDuelo,
    graficoTaxaVitorias,
    graficoDistribuicaoResultados,
    graficoCombinacoesLutadores,
    graficoLutadoresMaisEscolhidos
};
