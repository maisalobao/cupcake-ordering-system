# Regras de Negócio — Cupcake Ordering System

## 1. Objetivo

Este documento apresenta as regras de negócio que definem as condições e comportamentos que devem ser respeitados pelo Cupcake Ordering System.

As regras complementam os requisitos funcionais e não funcionais e servem como referência para a modelagem, desenvolvimento e testes da aplicação.

---

## 2. Regras de negócio

### RN01 — Disponibilidade do produto

Um produto desativado não deve ser apresentado como disponível para novos pedidos.

O administrador poderá desativar um produto sem removê-lo permanentemente do banco de dados.

---

### RN02 — Quantidade de produtos

A quantidade de um produto adicionada ao carrinho deve ser maior que zero.

O sistema não deve permitir o registro de quantidades iguais a zero ou negativas.

---

### RN03 — Carrinho vazio

O cliente não poderá confirmar um pedido caso o carrinho esteja vazio.

O pedido somente poderá ser iniciado quando houver pelo menos um produto no carrinho.

---

### RN04 — Cálculo do subtotal

O subtotal de cada item do pedido deve ser calculado com base na quantidade e no preço unitário do produto.

**Fórmula:**

`Subtotal = Quantidade × Preço Unitário`

---

### RN05 — Cálculo do valor total

O valor total do pedido deve corresponder à soma dos subtotais de todos os seus itens.

**Fórmula:**

`Valor Total = Σ Subtotal dos Itens`

---

### RN06 — Preservação do preço do pedido

O preço unitário registrado em um item do pedido deve corresponder ao preço do produto no momento da realização da compra.

Alterações posteriores no preço do produto não devem modificar o valor de pedidos já registrados.

---

### RN07 — Status do pedido

Um pedido poderá possuir um dos seguintes status:

- `RECEBIDO`
- `EM_PREPARO`
- `SAIU_PARA_ENTREGA`
- `ENTREGUE`
- `CANCELADO`

---

### RN08 — Fluxo de status do pedido

O fluxo normal de um pedido deve seguir a seguinte sequência:

`RECEBIDO → EM_PREPARO → SAIU_PARA_ENTREGA → ENTREGUE`

O pedido também poderá assumir o status `CANCELADO`, conforme as condições definidas pela aplicação.

---

### RN09 — Persistência do pedido

Um pedido confirmado deve permanecer registrado no sistema.

Pedidos não devem ser removidos fisicamente após serem entregues ou cancelados, permitindo a preservação de seu histórico.

---

### RN10 — Endereço de entrega

Cada pedido deve possuir um endereço de entrega associado.

O endereço registrado deve representar o endereço utilizado para aquela entrega específica.

---

### RN11 — Forma de pagamento

Cada pedido deve possuir uma forma de pagamento selecionada pelo cliente.

As formas de pagamento previstas no MVP são:

- `PIX`
- `CARTAO`
- `DINHEIRO`

---

### RN12 — Status do pagamento

O pagamento poderá possuir um dos seguintes status:

- `PENDENTE`
- `APROVADO`
- `CANCELADO`

---

### RN13 — Registro do pagamento

O sistema deve registrar a forma e o status do pagamento associado ao pedido.

No MVP, o pagamento será apenas registrado/simulado no sistema, não havendo integração com um gateway de pagamento real.

---

### RN14 — Integridade dos itens do pedido

Cada item de pedido deve estar associado a:

- um pedido existente;
- um produto existente;
- uma quantidade válida;
- um preço unitário válido.

---

### RN15 — Produtos em pedidos existentes

A desativação de um produto não deve alterar os registros de pedidos realizados anteriormente.

Um produto que tenha participado de pedidos anteriores deve permanecer registrado para preservar o histórico das compras.

---

## 3. Relação com os requisitos funcionais

As regras de negócio estão relacionadas aos seguintes requisitos funcionais:

| Regra | Requisitos relacionados |
|---|---|
| RN01 | RF01, RF03, RF04, RF05 |
| RN02 | RF06, RF07 |
| RN03 | RF13 |
| RN04 | RF09, RF14 |
| RN05 | RF09, RF14 |
| RN06 | RF14, RF18 |
| RN07 | RF16, RF19 |
| RN08 | RF16, RF19 |
| RN09 | RF14, RF17, RF18 |
| RN10 | RF10, RF14, RF18 |
| RN11 | RF12, RF20 |
| RN12 | RF20 |
| RN13 | RF20 |
| RN14 | RF14 |
| RN15 | RF05, RF18 |

---

## 4. Considerações para implementação

As regras apresentadas neste documento deverão ser consideradas durante:

1. a modelagem do banco de dados;
2. a implementação das funcionalidades;
3. a definição das validações da aplicação;
4. a elaboração dos casos de teste;
5. a realização dos testes com usuários.

Alterações nas regras de negócio deverão ser documentadas para manter a consistência entre os requisitos, a modelagem, a implementação e os testes.
