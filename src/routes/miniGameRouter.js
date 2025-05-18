const express = require('express');
const router = express.Router();
const MiniGameController = require('../controllers/miniGameController');

router.get('/lutadores', MiniGameController.listarLutadores);
router.get('/lutadores/:id', MiniGameController.buscarLutadorPorId);
router.post('/salvar_duelo', MiniGameController.salvarDuelo);

module.exports = router;
