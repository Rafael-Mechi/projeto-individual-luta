const express = require('express');
const router = express.Router();
const MiniGameController = require('../controllers/miniGameController');

router.post('/salvar_duelo', MiniGameController.salvarDuelo);

router.get('/taxa-vitorias-usuarios', MiniGameController.graficoTaxaVitorias);
router.get('/distribuicao-resultados', MiniGameController.graficoDistribuicaoResultados);
router.get('/lutadores-mais-escolhidos', MiniGameController.graficoLutadoresMaisEscolhidos);

module.exports = router;
