create database projeto_luta;
use projeto_luta;

create table Usuario (
	id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null,
    data_criacao datetime default current_timestamp
);

create table Estatistica_usuario (
    id int primary key auto_increment,
    vitorias int default 0,
    derrotas int default 0,
    total_lutas int default 0,

    fk_usuario int unique,

    foreign key (fk_usuario) references Usuario(id)
);

create table Nacionalidade(
	id int primary key auto_increment,
    nome varchar(50) not null
);

create table Arte_marcial(
	id int primary key auto_increment,
    nome varchar(75) not null unique
);

create table Lutador (
    id int primary key auto_increment,
    nome varchar(100) not null,
    data_nascimento date,
    
    fk_arte_marcial int,
    fk_nacionalidade int,
    
    foreign key (fk_arte_marcial) references Arte_marcial(id),
    foreign key (fk_nacionalidade) references Nacionalidade(id)
) auto_increment = 100;

create table Estatistica_lutador (
    id int primary key auto_increment,
    vitorias int default 0,
    derrotas int default 0,
    total_lutas int default 0,
    maior_sequencia_vitorias int default 0,
    
    fk_lutador int,
    
    foreign key (fk_lutador) references Lutador(id)
);

create table Luta (
    id int primary key auto_increment,
    data_luta date not null,
    local_luta varchar(100),
    
    fk_lutador_1 int not null,
    fk_lutador_2 int not null,
    fk_usuario int not null,
    
    foreign key (fk_lutador_1) references Lutador(id),
    foreign key (fk_lutador_2) REFERENCES Lutador(id),
    foreign key (fk_usuario) references Usuario(id)
) auto_increment = 1000;

create table Resultado_luta (
    id int primary key auto_increment,

	fk_vencedor int,
    empate boolean default false,

    fk_lutador_1 int,
    fk_lutador_2 int,
    
    
    foreign key (fk_lutador_1) references Lutador(id),
    foreign key (fk_lutador_2) references Lutador(id),
    foreign key (fk_vencedor) references Lutador(id)
);
