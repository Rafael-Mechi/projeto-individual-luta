create database if not exists projeto_luta;
use projeto_luta;

create table Arte_marcial(
	id int primary key auto_increment,
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
