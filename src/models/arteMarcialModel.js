var database = require("../database/config");

function buscarPreferencias() {
  var instrucaoSql = `
    SELECT 
      am.nome as arte_marcial,
      COUNT(u.fkArtemarcial) as total_usuarios
    FROM Arte_marcial am
    INNER JOIN Usuario u ON am.id = u.fkArtemarcial
    GROUP BY am.nome
    ORDER BY total_usuarios DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPreferencias
}