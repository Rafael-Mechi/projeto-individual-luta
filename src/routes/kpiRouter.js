const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');

router.get('/lutador-mais-escolhido', kpiController.obterLutadorMaisEscolhido);
router.get('/combinacao-com-mais-duelos', kpiController.obterCombinacaoMaisDuelos);
router.get('/questao-com-mais-erros', kpiController.obterQuestaoComMaisErros);
router.get('/preferencia-do-usuario/:idUsuario', kpiController.obterPreferenciaDoUsuario);

module.exports = router;