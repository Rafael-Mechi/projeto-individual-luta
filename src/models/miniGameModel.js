var database = require("../database/config");

function salvarDuelo(idUsuario, idLutadorEscolhido, idLutadorSorteado, resultado) {
    var instrucao = `
        INSERT INTO Luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
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
        FROM Luta l
        JOIN Usuario u ON l.fkUsuario = u.id
        GROUP BY u.nome
        ORDER BY taxa_vitoria DESC;
    `;
    return database.executar(instrucao);
}

function distribuicaoResultados() {
    var instrucao = `
        SELECT resultado, COUNT(*) AS total
        FROM Luta
        GROUP BY resultado;
    `;
    return database.executar(instrucao);
}

function lutadoresMaisEscolhidos() {
    var instrucao = `
        SELECT 
            l.nome,
            COUNT(*) AS total_escolhas
        FROM Luta lu
        JOIN Lutador l ON lu.fkLutadorEscolhido = l.id
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
        Luta
    JOIN 
        Lutador L1 ON Luta.fkLutadorEscolhido = L1.id
    JOIN 
        Lutador L2 ON Luta.fkLutadorSorteado = L2.id
    GROUP BY 
        Luta.fkLutadorEscolhido, Luta.fkLutadorSorteado, L1.nome, L2.nome
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
