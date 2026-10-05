-- ================================================
-- Cupcake Ordering System — Seed do Banco de Dados
-- ================================================

USE cupcake_db;

-- ------------------------------------------------
-- 1. USUÁRIOS
-- As senhas abaixo estão armazenadas como hashes BCrypt de demonstração.
-- A credencial de acesso deve ser definida/ajustada de acordo com
-- a implementação de autenticação adotada pelo sistema.
-- ------------------------------------------------

INSERT INTO usuario (nome, email, senha, tipo) VALUES
('Administrador', 'admin@cupcake.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'ADMINISTRADOR'),

('Ana Souza', 'ana@cupcake.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CLIENTE'),

('Carlos Oliveira', 'carlos@cupcake.com',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CLIENTE');

-- ------------------------------------------------
-- 2. PRODUTOS
-- ------------------------------------------------

INSERT INTO produto (nome, descricao, preco, imagem_url, ativo) VALUES
('Cupcake de Chocolate',
 'Cupcake de chocolate com cobertura cremosa de brigadeiro.',
 8.50,
 'https://example.com/images/cupcake-chocolate.jpg',
 TRUE),

('Cupcake de Baunilha',
 'Cupcake de baunilha com cobertura de creme e confeitos.',
 7.50,
 'https://example.com/images/cupcake-baunilha.jpg',
 TRUE),

('Cupcake Red Velvet',
 'Cupcake red velvet com cobertura de cream cheese.',
 10.00,
 'https://example.com/images/cupcake-red-velvet.jpg',
 TRUE),

('Cupcake de Morango',
 'Cupcake de baunilha recheado com morango e cobertura cremosa.',
 9.50,
 'https://example.com/images/cupcake-morango.jpg',
 TRUE),

('Cupcake de Limão',
 'Cupcake de limão com cobertura de mousse de limão.',
 8.00,
 'https://example.com/images/cupcake-limao.jpg',
 TRUE),

('Cupcake de Doce de Leite',
 'Cupcake de baunilha com recheio e cobertura de doce de leite.',
 9.00,
 'https://example.com/images/cupcake-doce-de-leite.jpg',
 TRUE),

('Cupcake de Coco',
 'Cupcake de coco com cobertura cremosa e coco ralado.',
 8.00,
 'https://example.com/images/cupcake-coco.jpg',
 TRUE),

('Cupcake de Café',
 'Cupcake de café com cobertura de creme de café.',
 9.00,
 'https://example.com/images/cupcake-cafe.jpg',
 TRUE),

('Cupcake de Pistache',
 'Cupcake de baunilha com creme de pistache.',
 11.50,
 'https://example.com/images/cupcake-pistache.jpg',
 TRUE),

('Cupcake Especial Desativado',
 'Produto utilizado para demonstrar o controle de disponibilidade do catálogo.',
 12.00,
 NULL,
 FALSE);

-- ------------------------------------------------
-- 3. PEDIDOS
-- ------------------------------------------------

INSERT INTO pedido (id_usuario, valor_total, status) VALUES
(2, 25.00, 'RECEBIDO'),
(2, 26.50, 'EM_PREPARO'),
(3, 41.00, 'SAIU_PARA_ENTREGA'),
(3, 18.00, 'ENTREGUE'),
(2, 16.00, 'CANCELADO');

-- ------------------------------------------------
-- 4. ITENS DOS PEDIDOS
-- ------------------------------------------------

INSERT INTO item_pedido
(id_pedido, id_produto, quantidade, preco_unitario, subtotal)
VALUES
-- Pedido 1: 2 Chocolate + 1 Baunilha = 24,50
(1, 1, 2, 8.50, 17.00),
(1, 2, 1, 7.50, 7.50),

-- Pedido 2: 1 Red Velvet + 1 Doce de Leite + 1 Baunilha = 26,50
(2, 3, 1, 10.00, 10.00),
(2, 6, 1, 9.00, 9.00),
(2, 2, 1, 7.50, 7.50),

-- Pedido 3: 1 Pistache + 2 Red Velvet + 1 Morango = 41,00
(3, 9, 1, 11.50, 11.50),
(3, 3, 2, 10.00, 20.00),
(3, 4, 1, 9.50, 9.50),

-- Pedido 4: 2 Café = 18,00
(4, 8, 2, 9.00, 18.00),

-- Pedido 5: 2 Limão = 16,00
(5, 5, 2, 8.00, 16.00);

-- ------------------------------------------------
-- 5. ENDEREÇOS DE ENTREGA
-- ------------------------------------------------

INSERT INTO endereco_entrega
(id_pedido, logradouro, numero, complemento, bairro, cidade, estado, cep)
VALUES
(1, 'Rua das Flores', '120', 'Apto 201', 'Centro', 'Campina Grande', 'PB', '58400-000'),

(2, 'Avenida Principal', '450', NULL, 'Prata', 'Campina Grande', 'PB', '58400-100'),

(3, 'Rua do Comércio', '85', 'Casa', 'Catolé', 'Campina Grande', 'PB', '58410-200'),

(4, 'Rua das Acácias', '310', NULL, 'Liberdade', 'Campina Grande', 'PB', '58414-000'),

(5, 'Rua João Pessoa', '55', 'Casa', 'Centro', 'Campina Grande', 'PB', '58400-050');

-- ------------------------------------------------
-- 6. PAGAMENTOS
-- ------------------------------------------------

INSERT INTO pagamento (id_pedido, forma_pagamento, status) VALUES
(1, 'PIX', 'APROVADO'),
(2, 'CARTAO', 'APROVADO'),
(3, 'PIX', 'APROVADO'),
(4, 'DINHEIRO', 'APROVADO'),
(5, 'CARTAO', 'CANCELADO');
