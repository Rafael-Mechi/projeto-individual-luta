var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/responder", function (req, res){
    quizController.responder(req, res);
});

router.get("/top-usuarios", function (req, res){
    quizController.topUsuarios(req, res);
});

router.get("/distribuicao-alternativas", function (req, res){
    quizController.distribuicao(req, res);
});

router.get("/percentual-questoes", function (req, res){
    quizController.percentualQuestoes(req, res);
});

module.exports = router;
