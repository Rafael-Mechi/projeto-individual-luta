var database = require("../database/config");

function salvarDuelo(idUsuario, idLutadorEscolhido, idLutadorSorteado, resultado) {
    var instrucao = `
        INSERT INTO Luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
        VALUES (${idUsuario}, ${idLutadorEscolhido}, ${idLutadorSorteado}, '${resultado}');
    `;
    return database.executar(instrucao);
}

function listarLutadores() {
    var instrucao = `
        SELECT id, nome FROM Lutador ORDER BY nome;
    `;
    return database.executar(instrucao);
}

function buscarLutadorPorId(id) {
    var instrucao = `
        SELECT id, nome FROM Lutador WHERE id = ${id};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarLutadores,
    buscarLutadorPorId,
    salvarDuelo
};
