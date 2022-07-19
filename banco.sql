
create table disciplinas (
    codigo serial not null primary key, 
    nome varchar(50) not null
);

insert into disciplinas (nome) values ('SW'),('PW2');