var express = require("express");
var router = express.Router();

var usuarioControllerLuta = require("../controllers/usuarioControllerLuta");

// Rota para cadastro de usuário de luta
router.post("/cadastrar", function (req, res) {
    usuarioControllerLuta.cadastrar(req, res);
});

// Rota para autenticação de usuário de luta
router.post("/autenticar", function (req, res) {
    usuarioControllerLuta.autenticar(req, res);
});

router.put("/mudar-senha", function (req, res) {
    usuarioControllerLuta.alterarSenha(req, res)
})

router.get("/listar", function (req, res) {
  usuarioControllerLuta.listar(req, res);
});

module.exports = router;
