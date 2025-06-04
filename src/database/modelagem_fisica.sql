create database if not exists projeto_luta;
use projeto_luta;

create table arte_marcial(
	id int primary key,
    nome varchar(75) not null unique
);

create table usuario (
	id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null,
    
    fkArtemarcial int,
    
    constraint fkArtemarcial foreign key (fkArtemarcial) references arte_marcial(id)
);

create table pergunta (
    id int primary key auto_increment,
    enunciado varchar(255) not null,
    resposta_correta CHAR(1) not null
);

create table respostaUsuario (
    id int primary key auto_increment,
    fkUsuario int not null,
    fkPergunta int not null,
    resposta_dada char(1) not null,
    
    foreign key (fkPergunta) references pergunta(id),
    foreign key (fkUsuario) references usuario(id)
);

create table lutador (
    id int primary key auto_increment,
    nome varchar(50),
    pontuacao int,
    fkArtemarcial int,
    foreign key (fkArtemarcial) references arte_marcial(id)
);

create table luta (
    id int primary key auto_increment,
    fkUsuario int not null,
    fkLutadorEscolhido int not null,
    fkLutadorSorteado int not null,
    resultado varchar(15),
    foreign key (fkUsuario) references usuario(id),
    foreign key (fkLutadorEscolhido) references lutador(id),
    foreign key (fkLutadorSorteado) references lutador(id)
);

-- autenticar usuario
SELECT id, nome, email FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';

-- cadastrar usuario
INSERT INTO usuario (nome, email, senha, fkArtemarcial)
        VALUES ('${nome}', '${email}', '${senha}', '${fkArtemarcial}');

-- registrar resposta do quiz
INSERT INTO respostaUsuario (fkUsuario, fkPergunta, resposta_dada)
        VALUES ('${idUsuario}', '${idPergunta}', UPPER('${respostaDada}'));

-- usuarios com mais acertos
SELECT u.nome AS usuario, COUNT(*) AS total_acertos
        FROM respostaUsuario ru
        INNER JOIN usuario u ON ru.fkUsuario = u.id
        INNER JOIN pergunta p ON ru.fkPergunta = p.id
        WHERE ru.resposta_dada = p.resposta_correta
        GROUP BY u.nome
        ORDER BY total_acertos DESC
        LIMIT 5;

-- distribuição de alternativas
SELECT resposta_dada AS alternativa, COUNT(*) AS total
        FROM respostaUsuario
        GROUP BY resposta_dada;

-- salvar duelo
INSERT INTO luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
        VALUES ('${idUsuario}', '${idLutadorEscolhido}', '${idLutadorSorteado}', '${resultado}');

-- distribuição dos resultados do mini game
SELECT resultado, COUNT(*) AS total
        FROM luta
        GROUP BY resultado;

-- lutador mais escolhido no mini game
SELECT 
            l.nome,
            COUNT(*) AS total_escolhas
        FROM luta lu
        JOIN lutador l ON lu.fkLutadorEscolhido = l.id
        GROUP BY l.nome
        ORDER BY total_escolhas DESC;

-- combinações de lutadores mais escolhidos
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

-- lutador mais escolhido no mini game
SELECT CONCAT(l.nome, ": ", count(*), ' Lutas') AS nome_aparicoes FROM lutador l
        INNER JOIN luta lu ON lu.fkLutadorEscolhido = l.id
        GROUP BY l.nome
        ORDER BY COUNT(*) DESC
        LIMIT 1;

-- combinação mais usada nos duelos
SELECT CONCAT(l1.nome, " x ", l2.nome, ' ', count(*), ' Lutas') AS duelo FROM lutador l1
        INNER JOIN luta lu ON lu.fkLutadorEscolhido = l1.id
        INNER JOIN lutador l2 ON l2.id = lu.fkLutadorSorteado
        GROUP BY l1.nome, l2.nome
        ORDER BY count(*)
        DESC
        LIMIT 1;

-- questão mais errada
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

-- preferência de lutador do usuário
SELECT u.id, u.nome AS Usuario, am.nome AS arte
        FROM usuario u
        INNER JOIN arte_marcial am ON am.id = u.fkArteMarcial
        WHERE u.id = '${idUsuario}';

-- preferência de lutadores entre os usuários
SELECT 
      am.nome as arte_marcial,
      COUNT(u.fkArtemarcial) as total_usuarios
    FROM arte_marcial am
    INNER JOIN usuario u ON am.id = u.fkArtemarcial
    GROUP BY am.nome
    ORDER BY total_usuarios DESC;

-- alterar senha
UPDATE usuario SET senha = '${senha}' WHERE email = '${email}';