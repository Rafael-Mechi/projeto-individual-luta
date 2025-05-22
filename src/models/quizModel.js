var database = require("../database/config");

function registrarResposta(idUsuario, idPergunta, respostaDada) {
    var instrucao = `
        INSERT INTO respostaUsuario (fkUsuario, fkPergunta, resposta_dada)
        VALUES (${idUsuario}, ${idPergunta}, UPPER('${respostaDada}'));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function topUsuariosMaisAcertos() {
    var instrucaoSql = `
        SELECT u.nome AS usuario, COUNT(*) AS total_acertos
        FROM respostaUsuario ru
        INNER JOIN usuario u ON ru.fkUsuario = u.id
        INNER JOIN pergunta p ON ru.fkPergunta = p.id
        WHERE ru.resposta_dada = p.resposta_correta
        GROUP BY u.nome
        ORDER BY total_acertos DESC
        LIMIT 5;
    `;
    console.log("Executando SQL [topUsuariosMaisAcertos]:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function distribuicaoAlternativas() {
    var instrucaoSql = `
        SELECT resposta_dada AS alternativa, COUNT(*) AS total
        FROM respostaUsuario
        GROUP BY resposta_dada;
    `;
    console.log("Executando SQL [distribuicaoAlternativas]:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function percentualAcertosQuestoes() {
    var instrucaoSql = `
        SELECT 
        CONCAT('Q: ', p.id) AS pergunta,
            ROUND(
            SUM(CASE 
            WHEN ru.resposta_dada = p.resposta_correta
            THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2
            ) AS percentual_acerto
        FROM 
        respostaUsuario ru
        INNER JOIN 
        pergunta p ON ru.fkPergunta = p.id
        GROUP BY 
            p.id
        ORDER BY 
        p.id;
    `;
    console.log("Executando SQL [percentualAcertosQuestoes]:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrarResposta,
    topUsuariosMaisAcertos,
    distribuicaoAlternativas,
    percentualAcertosQuestoes
};
