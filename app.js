var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT || 3333; // Adicionado fallback
var HOST_APP = process.env.APP_HOST || "localhost";

var app = express();

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
var indexRouter = require("./src/routes/indexx");
var usuarioRouter = require("./src/routes/usuarios");
var usuarioLutaRouter = require("./src/routes/usuarioLuta");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configuração para servir HTML diretamente
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));

// Rotas
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/usuarios-luta", usuarioLutaRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    Servidor rodando em: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO || 'desenvolvimento'}
    `);
});