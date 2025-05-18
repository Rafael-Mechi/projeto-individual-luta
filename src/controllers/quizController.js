var quizModel = require("../models/quizModel");

function responder(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var respostas = req.body.respostasServer;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
        return;
    }

    if (!respostas || !Array.isArray(respostas) || respostas.length === 0) {
        res.status(400).send("As respostas estão undefined ou inválidas!");
        return;
    }

    let promessas = [];

    for (let i = 0; i < respostas.length; i++) {
        let pergunta = respostas[i];
        if (pergunta.idPergunta == undefined || pergunta.resposta == undefined) {
            res.status(400).send("Alguma pergunta ou resposta está inválida!");
            return;
        }

        promessas.push(quizModel.registrarResposta(idUsuario, pergunta.idPergunta, pergunta.resposta));
    }

    Promise.all(promessas)
        .then(resultados => {
            res.json({
                mensagem: "Todas as respostas foram registradas com sucesso!",
                resultados: resultados
            });
        })
        .catch(erro => {
            console.log("\nHouve um erro ao registrar as respostas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function topUsuarios(req, res) {
    quizModel.topUsuariosMaisAcertos()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Houve um erro ao buscar o top de usuários com mais acertos:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function distribuicao(req, res) {
    quizModel.distribuicaoAlternativas()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado de distribuição encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar distribuição de alternativas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function percentualQuestoes(req, res) {
    quizModel.percentualAcertosQuestoes()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum percentual encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar percentual de acertos por questão:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    responder,
    topUsuarios,
    distribuicao,
    percentualQuestoes
};
