# Dicionário de Dados — Cupcake Ordering System

## 1. Objetivo

Este documento descreve a estrutura de dados do Cupcake Ordering System, detalhando as entidades, seus atributos, tipos, restrições e relacionamentos.

O dicionário de dados foi elaborado a partir dos requisitos funcionais, requisitos não funcionais, regras de negócio e casos de uso definidos na etapa de levantamento de requisitos do Projeto Integrador Transdisciplinar II (PI II).

---

## 2. Convenções

- **PK** — chave primária
- **FK** — chave estrangeira
- **NN** — not null (preenchimento obrigatório)
- **UQ** — valor único
- **DEF** — valor padrão

---

## 3. Entidades

### 3.1 usuario

Armazena os dados dos usuários do sistema (clientes e administradores).

| Atributo       | Tipo         | Restrições           | Descrição                                      |
|----------------|--------------|----------------------|------------------------------------------------|
| id_usuario     | INT          | PK, auto incremento  | Identificador único do usuário                 |
| nome           | VARCHAR(100) | NN                   | Nome completo do usuário                       |
| email          | VARCHAR(150) | NN, UQ               | Endereço de e-mail do usuário                  |
| senha          | VARCHAR(255) | NN                   | Senha do usuário (armazenada com hash)         |
| tipo           | ENUM         | NN, DEF 'CLIENTE'    | Tipo do usuário: `CLIENTE` ou `ADMINISTRADOR`  |
| criado_em      | DATETIME     | NN, DEF NOW()        | Data e hora de criação do registro             |

**Regras relacionadas:** nenhuma regra de negócio específica; a distinção entre Cliente e Administrador fundamenta os casos de uso UC01 a UC07.

---

### 3.2 produto

Armazena os cupcakes disponíveis na loja.

| Atributo       | Tipo           | Restrições           | Descrição                                        |
|----------------|----------------|----------------------|--------------------------------------------------|
| id_produto     | INT            | PK, auto incremento  | Identificador único do produto                   |
| nome           | VARCHAR(100)   | NN                   | Nome do cupcake                                  |
| descricao      | TEXT           |                      | Descrição do cupcake                             |
| preco          | DECIMAL(10,2)  | NN                   | Preço unitário do cupcake                        |
| imagem_url     | VARCHAR(255)   |                      | Caminho ou URL da imagem do produto              |
| ativo          | BOOLEAN        | NN, DEF TRUE         | Indica se o produto está disponível para compra  |
| criado_em      | DATETIME       | NN, DEF NOW()        | Data e hora de criação do registro               |
| atualizado_em  | DATETIME       | NN, DEF NOW()        | Data e hora da última atualização                |

**Requisitos relacionados:** RF01, RF02, RF03, RF04, RF05

**Regras relacionadas:** RN01 (produto desativado não aparece como disponível), RN15 (produto em pedidos anteriores não é removido)

---

### 3.3 pedido

Armazena os pedidos realizados pelos clientes.

| Atributo          | Tipo           | Restrições           | Descrição                                          |
|-------------------|----------------|----------------------|----------------------------------------------------|
| id_pedido         | INT            | PK, auto incremento  | Identificador único do pedido                      |
| id_usuario        | INT            | FK, NN               | Referência ao usuário que realizou o pedido         |
| valor_total       | DECIMAL(10,2)  | NN                   | Valor total do pedido (soma dos subtotais)          |
| status            | ENUM           | NN, DEF 'RECEBIDO'   | Status do pedido: `RECEBIDO`, `EM_PREPARO`, `SAIU_PARA_ENTREGA`, `ENTREGUE`, `CANCELADO` |
| criado_em         | DATETIME       | NN, DEF NOW()        | Data e hora de criação do pedido                   |
| atualizado_em     | DATETIME       | NN, DEF NOW()        | Data e hora da última atualização                  |

**Relacionamentos:**

- `id_usuario` → `usuario.id_usuario`

**Requisitos relacionados:** RF13, RF14, RF15, RF16, RF17, RF18, RF19

**Regras relacionadas:** RN03 (carrinho não pode estar vazio), RN05 (valor total = soma dos subtotais), RN07 e RN08 (status e fluxo), RN09 (pedido não é removido após entrega ou cancelamento)

---

### 3.4 item_pedido

Armazena os itens que compõem cada pedido.

| Atributo          | Tipo           | Restrições           | Descrição                                          |
|-------------------|----------------|----------------------|----------------------------------------------------|
| id_item_pedido    | INT            | PK, auto incremento  | Identificador único do item                        |
| id_pedido         | INT            | FK, NN               | Referência ao pedido                               |
| id_produto        | INT            | FK, NN               | Referência ao produto                              |
| quantidade        | INT            | NN                   | Quantidade do produto no pedido                    |
| preco_unitario    | DECIMAL(10,2)  | NN                   | Preço unitário do produto no momento do pedido     |
| subtotal          | DECIMAL(10,2)  | NN                   | Subtotal do item (quantidade × preço unitário)     |

**Relacionamentos:**

- `id_pedido` → `pedido.id_pedido`
- `id_produto` → `produto.id_produto`

**Requisitos relacionados:** RF09, RF14

**Regras relacionadas:** RN02 (quantidade maior que zero), RN04 (subtotal = quantidade × preço unitário), RN06 (preço registrado é o do momento da compra), RN14 (integridade dos itens)

---

### 3.5 endereco_entrega

Armazena o endereço de entrega associado a cada pedido.

| Atributo          | Tipo          | Restrições           | Descrição                                  |
|-------------------|---------------|----------------------|--------------------------------------------|
| id_endereco       | INT           | PK, auto incremento  | Identificador único do endereço            |
| id_pedido         | INT           | FK, NN, UQ           | Referência ao pedido                       |
| logradouro        | VARCHAR(200)  | NN                   | Rua, avenida ou logradouro                 |
| numero            | VARCHAR(20)   | NN                   | Número do endereço                         |
| complemento       | VARCHAR(100)  |                      | Complemento (apartamento, bloco etc.)      |
| bairro            | VARCHAR(100)  | NN                   | Bairro                                     |
| cidade            | VARCHAR(100)  | NN                   | Cidade                                     |
| estado            | CHAR(2)       | NN                   | Sigla do estado (UF)                       |
| cep               | VARCHAR(9)    | NN                   | CEP do endereço                            |

**Relacionamentos:**

- `id_pedido` → `pedido.id_pedido`

**Requisitos relacionados:** RF10

**Regras relacionadas:** RN10 (cada pedido deve possuir um endereço de entrega)

---

### 3.6 pagamento

Armazena as informações de pagamento de cada pedido.

| Atributo          | Tipo           | Restrições           | Descrição                                          |
|-------------------|----------------|----------------------|----------------------------------------------------|
| id_pagamento      | INT            | PK, auto incremento  | Identificador único do pagamento                   |
| id_pedido         | INT            | FK, NN, UQ           | Referência ao pedido                               |
| forma_pagamento   | ENUM           | NN                   | Forma de pagamento: `PIX`, `CARTAO`, `DINHEIRO`    |
| status            | ENUM           | NN, DEF 'PENDENTE'   | Status do pagamento: `PENDENTE`, `APROVADO`, `CANCELADO` |
| criado_em         | DATETIME       | NN, DEF NOW()        | Data e hora do registro do pagamento               |
| atualizado_em     | DATETIME       | NN, DEF NOW()        | Data e hora da última atualização                  |

**Relacionamentos:**

- `id_pedido` → `pedido.id_pedido`

**Requisitos relacionados:** RF12, RF20

**Regras relacionadas:** RN11 (forma de pagamento obrigatória), RN12 (status do pagamento), RN13 (pagamento simulado no MVP)

---

## 4. Diagrama de relacionamentos (resumo textual)

```
usuario (1) ——— (N) pedido
pedido  (1) ——— (N) item_pedido
pedido  (1) ——— (1) endereco_entrega
pedido  (1) ——— (1) pagamento
produto (1) ——— (N) item_pedido
```

- Um **usuário** pode realizar vários **pedidos**.
- Um **pedido** contém um ou mais **itens de pedido**.
- Cada **item de pedido** referencia um **produto**.
- Cada **pedido** possui exatamente um **endereço de entrega**.
- Cada **pedido** possui exatamente um **pagamento**.

---

## 5. Observações sobre o carrinho

O carrinho de compras opera no lado do cliente (frontend) e não é persistido como entidade no banco de dados do MVP.

Os dados do carrinho são mantidos em memória durante a sessão do usuário e convertidos em registros de `item_pedido` no momento da confirmação do pedido.

Essa decisão pode ser revisada em versões futuras, caso seja necessário persistir o carrinho para recuperação de sessão ou abandono de carrinho.

---

## 6. Rastreabilidade

| Entidade          | Requisitos funcionais         | Regras de negócio             |
|-------------------|-------------------------------|-------------------------------|
| usuario           | UC01 a UC07                   | —                             |
| produto           | RF01, RF02, RF03, RF04, RF05  | RN01, RN15                    |
| pedido            | RF13, RF14, RF15, RF16, RF17, RF18, RF19 | RN03, RN05, RN07, RN08, RN09 |
| item_pedido       | RF09, RF14                    | RN02, RN04, RN06, RN14       |
| endereco_entrega  | RF10                          | RN10                          |
| pagamento         | RF12, RF20                    | RN11, RN12, RN13              |

---

## 7. Considerações

O dicionário de dados apresentado reflete a estrutura necessária para atender aos requisitos e regras de negócio definidos para o MVP do Cupcake Ordering System.

A estrutura poderá ser refinada durante as etapas de implementação do banco de dados e desenvolvimento da aplicação, desde que as alterações sejam documentadas e permaneçam coerentes com os demais artefatos do projeto.
