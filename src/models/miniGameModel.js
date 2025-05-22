var database = require("../database/config");

function salvarDuelo(idUsuario, idLutadorEscolhido, idLutadorSorteado, resultado) {
    var instrucao = `
        INSERT INTO luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
        VALUES (${idUsuario}, ${idLutadorEscolhido}, ${idLutadorSorteado}, '${resultado}');
    `;
    return database.executar(instrucao);
}

function taxaVitoriasUsuarios() {
    var instrucao = `
        SELECT 
            u.nome AS usuario,
            COUNT(*) AS total_lutas,
            SUM(CASE WHEN l.resultado = 'vitória' THEN 1 ELSE 0 END) AS total_vitorias,
            ROUND(SUM(CASE WHEN l.resultado = 'vitória' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS taxa_vitoria
        FROM luta l
        JOIN usuario u ON l.fkUsuario = u.id
        GROUP BY u.nome
        ORDER BY taxa_vitoria DESC;
    `;
    return database.executar(instrucao);
}

function distribuicaoResultados() {
    var instrucao = `
        SELECT resultado, COUNT(*) AS total
        FROM luta
        GROUP BY resultado;
    `;
    return database.executar(instrucao);
}

function lutadoresMaisEscolhidos() {
    var instrucao = `
        SELECT 
            l.nome,
            COUNT(*) AS total_escolhas
        FROM luta lu
        JOIN lutador l ON lu.fkLutadorEscolhido = l.id
        GROUP BY l.nome
        ORDER BY total_escolhas DESC;
    `;
    return database.executar(instrucao);
}


function combinacoesLutadoresMaisFrequentes() {
    var instrucao = `
                    SELECT 
        L1.nome AS Lutador_Escolhido,
        L2.nome AS Lutador_Sorteado,
        COUNT(*) AS Quantidade_Duelos
    FROM 
        luta
    JOIN 
        lutador L1 ON luta.fkLutadorEscolhido = L1.id
    JOIN 
        lutador L2 ON luta.fkLutadorSorteado = L2.id
    GROUP BY 
        luta.fkLutadorEscolhido, luta.fkLutadorSorteado, L1.nome, L2.nome
    ORDER BY 
        Quantidade_Duelos DESC
    LIMIT 5;
    `;
    return database.executar(instrucao);
}


module.exports = {
    salvarDuelo,
    taxaVitoriasUsuarios,
    distribuicaoResultados,
    lutadoresMaisEscolhidos,
    combinacoesLutadoresMaisFrequentes
};
