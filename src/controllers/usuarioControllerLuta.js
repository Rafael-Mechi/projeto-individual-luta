var usuarioModelLuta = require("../models/usuarioModelLuta");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModelLuta.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkArtemarcial = req.body.arteMarcialServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModelLuta.cadastrar(nome, email, senha, fkArtemarcial)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function alterarSenha(req, res) {
    var email = req.body.emailServer;
    var senhaAntiga = req.body.senhaAntigaServer;
    var senhaNova = req.body.senhaNovaServer;
    var repetirSenha = req.body.repetirSenhaServer;

    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (senhaAntiga == undefined) {
        res.status(400).send("Sua senha antiga está undefined!");
    } else if (senhaNova == undefined) {
        res.status(400).send("Sua senha nova está undefined!");
    } else if (repetirSenha == undefined) {
        res.status(400).send("Sua senha repetida está undefined!");
    }

    usuarioModelLuta.alterarSenha(email, senhaNova)
        .then(resultado => {
            console.log("Senha alterada: ", resultado);
            res.status(200).send("Senha alterada com sucesso!");
        })
        .catch(erro => {
            console.log("Houve um erro ao atualizar a senha:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    usuarioModelLuta.listar().then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    alterarSenha,
    listar
}
