-- ================================================
-- Cupcake Ordering System — Schema do Banco de Dados
-- ================================================

CREATE DATABASE IF NOT EXISTS cupcake_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cupcake_db;

-- ------------------------------------------------
-- 1. usuario
-- ------------------------------------------------
CREATE TABLE usuario (
  id_usuario    INT           AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  senha         VARCHAR(255)  NOT NULL,
  tipo          ENUM('CLIENTE', 'ADMINISTRADOR') NOT NULL DEFAULT 'CLIENTE',
  criado_em     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- 2. produto
-- ------------------------------------------------
CREATE TABLE produto (
  id_produto    INT            AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100)   NOT NULL,
  descricao     TEXT,
  preco         DECIMAL(10,2)  NOT NULL,
  imagem_url    VARCHAR(255),
  ativo         BOOLEAN        NOT NULL DEFAULT TRUE,
  criado_em     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- 3. pedido
-- ------------------------------------------------
CREATE TABLE pedido (
  id_pedido     INT            AUTO_INCREMENT PRIMARY KEY,
  id_usuario    INT            NOT NULL,
  valor_total   DECIMAL(10,2)  NOT NULL,
  status        ENUM('RECEBIDO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADO')
                               NOT NULL DEFAULT 'RECEBIDO',
  criado_em     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_pedido_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- ------------------------------------------------
-- 4. item_pedido
-- ------------------------------------------------
CREATE TABLE item_pedido (
  id_item_pedido  INT            AUTO_INCREMENT PRIMARY KEY,
  id_pedido       INT            NOT NULL,
  id_produto      INT            NOT NULL,
  quantidade      INT            NOT NULL,
  preco_unitario  DECIMAL(10,2)  NOT NULL,
  subtotal        DECIMAL(10,2)  NOT NULL,

  CONSTRAINT fk_item_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
  CONSTRAINT fk_item_produto
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
  CONSTRAINT chk_quantidade_positiva
    CHECK (quantidade > 0)
);

-- ------------------------------------------------
-- 5. endereco_entrega
-- ------------------------------------------------
CREATE TABLE endereco_entrega (
  id_endereco   INT           AUTO_INCREMENT PRIMARY KEY,
  id_pedido     INT           NOT NULL UNIQUE,
  logradouro    VARCHAR(200)  NOT NULL,
  numero        VARCHAR(20)   NOT NULL,
  complemento   VARCHAR(100),
  bairro        VARCHAR(100)  NOT NULL,
  cidade        VARCHAR(100)  NOT NULL,
  estado        CHAR(2)       NOT NULL,
  cep           VARCHAR(9)    NOT NULL,

  CONSTRAINT fk_endereco_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);

-- ------------------------------------------------
-- 6. pagamento
-- ------------------------------------------------
CREATE TABLE pagamento (
  id_pagamento    INT       AUTO_INCREMENT PRIMARY KEY,
  id_pedido       INT       NOT NULL UNIQUE,
  forma_pagamento ENUM('PIX', 'CARTAO', 'DINHEIRO') NOT NULL,
  status          ENUM('PENDENTE', 'APROVADO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE',
  criado_em       DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em   DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_pagamento_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);
