# `Criar banco`
CREATE DATABASE pontodb

# `Criar tabela usuário`

CREATE TABLE usuarios (id int PRIMARY KEY auto_increment,nome VARCHAR(255), email VARCHAR(255), senha VARCHAR(255))


# `Criar tabela mercadorias`

CREATE TABLE mercadorias (id int PRIMARY KEY auto_increment, nome VARCHAR(255) NOT NULL, valorCompra DECIMAL() NOT NULL


# `Zerar tabela`

TRUNCATE TABLE [nome_tabela];

# `Criar tabela Produtos`

CREATE TABLE produtos (id int PRIMARY KEY auto_increment, nome VARCHAR(255) NOT NULL, descricao VARCHAR(255), quantidade int, valor_compra DECIMAL() NOT NULL, valor_venda DECIMAL() NOT NULL, data_entrada TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, data_validade DATE
);

# `Inserir dados de exemplo na tabela`

insert into produtos (nome, descricao, quantidade, valor_compra, valor_venda, data_validade) VALUES ('cerveja bhrama', '600ml',24,'5.29','8.99', 20190807);

ORM
BACK-END
https://www.npmjs.com/package/typeorm
https://typeorm.io/#/