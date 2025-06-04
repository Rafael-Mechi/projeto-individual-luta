var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL LUTA \n\n function autenticar():", email, senha);
    
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkArtemarcial) {
    console.log("ACESSEI O USUARIO MODEL LUTA \n\n function cadastrar():", nome, email, senha, fkArtemarcial);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkArtemarcial)
        VALUES ('${nome}', '${email}', '${senha}', '${fkArtemarcial}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarSenha(email, senha){
    console.log("ENTRANDO NO MODEL PARA ALTERAR SENHA: ", email, senha);
    
    var instrucaoSql = `
        UPDATE usuario SET senha = '${senha}' WHERE email = '${email}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT email, senha FROM usuario`;

  return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    alterarSenha,
    listar
};
