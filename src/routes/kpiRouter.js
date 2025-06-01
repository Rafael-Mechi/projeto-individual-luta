const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');

router.get('/lutador-mais-escolhido', kpiController.obterLutadorMaisEscolhido);

module.exports = router;