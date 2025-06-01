var database = require("../database/config");

function salvarDuelo(idUsuario, idLutadorEscolhido, idLutadorSorteado, resultado) {
    var instrucao = `
        INSERT INTO luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
        VALUES (${idUsuario}, ${idLutadorEscolhido}, ${idLutadorSorteado}, '${resultado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function taxaVitoriasUsuarios() {
    var instrucao = `
                SELECT 
            u.nome AS usuario,
            COUNT(*) AS total_lutas,
            SUM(l.resultado = 'vitória') AS total_vitorias,
            ROUND(AVG(l.resultado = 'vitória') * 100, 2) AS taxa_vitoria
        FROM luta l
        JOIN usuario u ON l.fkUsuario = u.id
        GROUP BY u.nome
        ORDER BY taxa_vitoria DESC;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function distribuicaoResultados() {
    var instrucao = `
        SELECT resultado, COUNT(*) AS total
        FROM luta
        GROUP BY resultado;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function combinacoesLutadoresMaisFrequentes() {
    var instrucao = `
                    SELECT 
        l1.nome AS Lutador_Escolhido,
        l2.nome AS Lutador_Sorteado,
        COUNT(*) AS Quantidade_Duelos
    FROM 
        luta
    JOIN 
        lutador l1 ON luta.fkLutadorEscolhido = l1.id
    JOIN 
        lutador l2 ON luta.fkLutadorSorteado = l2.id
    GROUP BY 
        luta.fkLutadorEscolhido, luta.fkLutadorSorteado, l1.nome, l2.nome
    ORDER BY 
        Quantidade_Duelos DESC
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    salvarDuelo,
    taxaVitoriasUsuarios,
    distribuicaoResultados,
    lutadoresMaisEscolhidos,
    combinacoesLutadoresMaisFrequentes
};
