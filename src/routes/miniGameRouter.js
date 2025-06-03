const express = require('express');
const router = express.Router();
const MiniGameController = require('../controllers/miniGameController');

router.post('/salvar_duelo', MiniGameController.salvarDuelo);

router.get('/usuarios-mais-vitoriosos', MiniGameController.qtdVitoriasUsuarios);
router.get('/distribuicao-resultados', MiniGameController.distribuicaoResultados);
router.get('/lutadores-mais-escolhidos', MiniGameController.lutadoresMaisEscolhidos);
router.get('/combinacoes-lutadores', MiniGameController.combinacoesLutadores);

module.exports = router;