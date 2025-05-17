create database if not exists projeto_luta;
use projeto_luta;

create table Arte_marcial(
	id int primary key,
    nome varchar(75) not null unique
);

create table Usuario (
	id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null,
    
    fkArtemarcial int,
    
    constraint fkArtemarcial foreign key (fkArtemarcial) references Arte_marcial(id)
);

INSERT INTO Arte_marcial (id, nome) VALUES
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

select * from Usuario;