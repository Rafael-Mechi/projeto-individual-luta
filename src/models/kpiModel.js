var database = require("../database/config");

function obterLutadorMaisEscolhido() {
    var instrucao = `
        SELECT CONCAT(l.nome, ": ", count(*), ' Lutas') AS nome_aparicoes FROM lutador l
        INNER JOIN luta lu ON lu.fkLutadorEscolhido = l.id
        GROUP BY l.nome
        ORDER BY COUNT(*) DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    obterLutadorMaisEscolhido
}