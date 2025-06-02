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

function obterCombinacaoMaisDuelos() {
    var instrucao = `
        SELECT CONCAT(l1.nome, " x ", l2.nome, ' ', count(*), ' Lutas') AS duelo FROM lutador l1
        INNER JOIN luta lu ON lu.fkLutadorEscolhido = l1.id
        INNER JOIN lutador l2 ON l2.id = lu.fkLutadorSorteado
        GROUP BY l1.nome, l2.nome
        ORDER BY count(*)
        DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterQuestaoComMaisErros() {
    var instrucao = `
            SELECT 
        p.id AS numero_da_pergunta, 
        COUNT(*) AS total_erros
        FROM 
        respostaUsuario r
        JOIN 
        pergunta p ON r.fkPergunta = p.id
        WHERE 
        NOT r.resposta_dada = p.resposta_correta
        GROUP BY 
        p.id
        ORDER BY 
        total_erros DESC
            LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterPreferenciaDoUsuario(idUsuario) {
    var instrucao = `
        SELECT u.id, u.nome AS Usuario, am.nome AS arte
        FROM usuario u
        INNER JOIN arte_marcial am ON am.id = u.fkArteMarcial
        WHERE u.id = '${idUsuario}';
    `;
    return database.executar(instrucao);
}

module.exports = {
    obterLutadorMaisEscolhido,
    obterCombinacaoMaisDuelos,
    obterQuestaoComMaisErros,
    obterPreferenciaDoUsuario
}