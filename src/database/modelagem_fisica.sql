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


select * from usuario;
select * from pergunta;
select * from respostaUsuario;

SELECT u.nome AS usuario, COUNT(*) AS total_acertos
        FROM respostaUsuario ru
        JOIN usuario u ON ru.fkUsuario = u.id
        JOIN pergunta p ON ru.fkPergunta = p.id
        WHERE ru.resposta_dada = p.resposta_correta
        GROUP BY u.nome
        ORDER BY total_acertos DESC
        LIMIT 5;
        
        SELECT p.id AS 'Número da questão', 
               ROUND(SUM(CASE WHEN UPPER(ru.resposta_dada) = UPPER(p.resposta_correta) THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS percentual_acerto
        FROM respostaUsuario ru
        JOIN pergunta p ON ru.fkPergunta = p.id
        GROUP BY p.id;
        
        SELECT 
  CONCAT('Q: ', p.id) AS pergunta,
  ROUND(
    SUM(CASE 
        WHEN ru.resposta_dada = p.resposta_correta
        THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2
  ) AS percentual_acerto
FROM 
  respostaUsuario ru
JOIN 
  pergunta p ON ru.fkPergunta = p.id
GROUP BY 
  p.id
ORDER BY 
  p.id;
  
  SELECT 
    CASE 
        WHEN l1.nome < l2.nome THEN l1.nome
        ELSE l2.nome
    END AS lutador1,
    CASE 
        WHEN l1.nome > l2.nome THEN l1.nome
        ELSE l2.nome
    END AS lutador2,
    COUNT(*) AS total
FROM luta lu
JOIN lutador l1 ON lu.fkLutadorEscolhido = l1.id
JOIN lutador l2 ON lu.fkLutadorSorteado = l2.id
GROUP BY lutador1, lutador2
ORDER BY total DESC
LIMIT 5;
  
  select * from usuario;
  
  select * from luta;
  
  
   SELECT u.nome AS usuario, COUNT(*) AS total_acertos
        FROM respostaUsuario ru
        INNER JOIN usuario u ON ru.fkUsuario = u.id
        INNER JOIN pergunta p ON ru.fkPergunta = p.id
        WHERE ru.resposta_dada = p.resposta_correta
        GROUP BY u.nome
        ORDER BY total_acertos DESC
        LIMIT 5;