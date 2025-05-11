var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/indexx.html'));
});

router.get("/cadastro-luta", function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/cadastro_luta.html'));
});

module.exports = router;