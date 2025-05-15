var express = require("express");
var router = express.Router();

var arteMarcialController = require("../controllers/arteMarcialController");

router.get("/preferencias", function (req, res) {
  arteMarcialController.buscarPreferencias(req, res);
});

module.exports = router;