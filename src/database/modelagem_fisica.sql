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

create table alternativa (
    id int primary key auto_increment,
    alternativa char(1) not null,
    texto_alternativa varchar(100) not null,
    fkPergunta int not null,
    foreign key (fkPergunta) references pergunta(id)
);


create table respostaUsuario (
    id int primary key auto_increment,
    fkUsuario int not null,
    fkPergunta int not null,
    resposta_dada char(1) not null,
    
    foreign key (fkPergunta) references pergunta(id),
    foreign key (fkUsuario) references usuario(id)
);

select * from respostaUsuario;

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

insert into arte_marcial (id, nome) values
(1, 'Aikido'),
(2, 'Boxe'),
(3, 'Capoeira'),
(4, 'Jiu-Jitsu'),
(5, 'Judo'),
(6, 'Karatê'),
(7, 'Kickboxing'),
(8, 'Kung Fu'),
(9, 'MMA'),
(10, 'Muay Thai'),
(11, 'Taekwondo'),
(12, 'Wing Chun'),
(13, 'Wrestling');

insert into lutador (nome, pontuacao, fkArteMarcial) values
('alex_pereira', 2200, 7),
('jon_jones', 2450, 9),
('israel_adesanya', 2300, 7),
('conor_mcgregor', 2100, 9),
('charles_oliveira', 2250, 4),
('khabib_nurmagomedov', 2400, 13),
('amanda_nunes', 2150, 9),
('mica_galvao', 1900, 4),
('gordon_ryan', 2000, 4),
('roger_gracie', 1950, 4),
('kayla_harrison', 1850, 5),
('demetrious_johnson', 2050, 9),
('reinier_de_ridder', 1750, 9);

insert into pergunta (enunciado, resposta_correta) values
('Quantas faixas existem no jiu jitsu, incluindo até a preta?', 'D'),
('Qual dos lutadores abaixo já foi campeão duplo no UFC?', 'B'),
('Qual das artes marciais abaixo é conhecida por usar, além de socos e chutes, joelhadas e cotoveladas?', 'C'),
('Qual arte marcial é conhecida pelo estilo de luta em quedas?', 'D'),
('Em qual país o Muay Thai é uma arte marcial tradicional?', 'A'),
('Qual evento teve mais audiência do UFC?', 'C'),
('A trilogia Creed é inspirada em qual estilo de luta?', 'B'),
('Qual dos personagens abaixo de street fighter luta karatê?', 'B'),
('Qual dos golpes abaixo é popular no boxe?', 'D'),
('Qual dos animes abaixo é conhecido por ser um anime de luta?', 'A');

insert into alternativa (alternativa, texto_alternativa, fkPergunta) values
-- Pergunta 1
('A', '6 faixas', 1),
('B', '7 faixas', 1),
('C', '8 faixas', 1),
('D', '9 faixas', 1),

-- Pergunta 2
('A', 'José Aldo', 2),
('B', 'Amanda Nunes', 2),
('C', 'Nate Diaz', 2),
('D', 'Charles do Bronx', 2),

-- Pergunta 3
('A', 'Karatê', 3),
('B', 'Boxe', 3),
('C', 'Muay Thai', 3),
('D', 'Taekwondo', 3),

-- Pergunta 4
('A', 'Sambo', 4),
('B', 'Krav Maga', 4),
('C', 'Kickboxing', 4),
('D', 'Judô', 4),

-- Pergunta 5
('A', 'Tailândia', 5),
('B', 'Sri Lanka', 5),
('C', 'Filipinas', 5),
('D', 'Japão', 5),

-- Pergunta 6
('A', 'Jon Jones x Lyoto Machida', 6),
('B', 'Andreson Silva x Vitor Belfort', 6),
('C', 'McGregor x Khabib', 6),
('D', 'Amanda Nunes x Ronda Rousey', 6),

-- Pergunta 7
('A', 'Jiu-Jitsu', 7),
('B', 'Boxe', 7),
('C', 'Ninjustu', 7),
('D', 'Capoeira', 7),

-- Pergunta 8
('A', 'Chun-Li', 8),
('B', 'Ryu', 8),
('C', 'Ken', 8),
('D', 'Zangief', 8),

-- Pergunta 9
('A', 'Cotovelada', 9),
('B', 'Mata-leão', 9),
('C', 'Chute na panturrilha', 9),
('D', 'Direto', 9),

-- Pergunta 10
('A', 'Dragon Ball', 10),
('B', 'Death Note', 10),
('C', 'Cells At Work', 10),
('D', 'Mob Psycho', 10);


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

-- percentual de questões acertadas
SELECT  
        CONCAT('Q: ', fkPergunta) AS pergunta,
        FORMAT(
            COUNT(*) * 100.0 / 
            (SELECT COUNT(*) 
            FROM respostaUsuario tot 
            WHERE tot.fkPergunta = ru.fkPergunta), 
            2
        ) AS percentual_acerto
    FROM respostaUsuario ru
    JOIN pergunta pe ON pe.id = fkPergunta 
    WHERE pe.resposta_correta = ru.resposta_dada
    GROUP BY fkPergunta
    ORDER BY fkPergunta;

-- salvar duelo
INSERT INTO luta (fkUsuario, fkLutadorEscolhido, fkLutadorSorteado, resultado)
        VALUES ('${idUsuario}', '${idLutadorEscolhido}', '${idLutadorSorteado}', '${resultado}');

-- taxa de vitória entre os usuários
SELECT 
            u.nome AS usuario,
            COUNT(*) AS total_lutas,
            SUM(l.resultado = 'vitória') AS total_vitorias,
            ROUND(AVG(l.resultado = 'vitória') * 100, 2) AS taxa_vitoria
        FROM luta l
        JOIN usuario u ON l.fkUsuario = u.id
        GROUP BY u.nome
        ORDER BY taxa_vitoria DESC;

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