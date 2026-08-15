# Casos de Uso — Cupcake Ordering System

## 1. Objetivo

Este documento apresenta os principais casos de uso do Cupcake Ordering System, descrevendo as interações entre os atores e o sistema.

Os casos de uso foram definidos a partir dos requisitos funcionais e das regras de negócio estabelecidos para o MVP do Projeto Integrador Transdisciplinar II (PI II).

---

## 2. Atores

### 2.1 Cliente

Usuário que utiliza o sistema para consultar produtos, montar seu carrinho, realizar pedidos e acompanhar o status de suas compras.

### 2.2 Administrador

Usuário responsável pelo gerenciamento dos produtos e dos pedidos da loja.

---

# 3. Casos de uso

## UC01 — Visualizar catálogo

**Ator principal:** Cliente

**Objetivo:** Permitir que o cliente visualize os cupcakes disponíveis para compra.

**Pré-condições:**
- O sistema deve estar disponível.

**Fluxo principal:**

1. O cliente acessa o sistema.
2. O sistema consulta os produtos disponíveis.
3. O sistema apresenta o catálogo.
4. O cliente visualiza os cupcakes disponíveis, incluindo nome, imagem e preço.

**Fluxo alternativo:**

- Caso não existam produtos disponíveis, o sistema informa que não há cupcakes disponíveis para compra.

**Pós-condição:**

- O cliente consegue visualizar os produtos disponíveis.

**Requisitos relacionados:**
- RF01

**Regras relacionadas:**
- RN01

---

## UC02 — Visualizar detalhes do produto

**Ator principal:** Cliente

**Objetivo:** Permitir que o cliente consulte informações detalhadas de um cupcake.

**Pré-condições:**
- O produto deve estar cadastrado.
- O produto deve estar disponível para consulta.

**Fluxo principal:**

1. O cliente acessa o catálogo.
2. O cliente seleciona um cupcake.
3. O sistema consulta as informações do produto.
4. O sistema apresenta o nome, descrição, preço e imagem do produto.

**Fluxo alternativo:**

- Caso o produto tenha sido desativado, o sistema informa que o produto não está disponível para compra.

**Pós-condição:**

- O cliente visualiza os detalhes do produto.

**Requisitos relacionados:**
- RF02

**Regras relacionadas:**
- RN01

---

## UC03 — Gerenciar carrinho

**Ator principal:** Cliente

**Objetivo:** Permitir que o cliente selecione os produtos que deseja comprar e ajuste suas quantidades.

**Pré-condições:**
- O produto deve estar disponível para compra.

**Fluxo principal:**

1. O cliente seleciona um produto.
2. O cliente adiciona o produto ao carrinho.
3. O sistema registra o produto no carrinho.
4. O cliente pode alterar a quantidade do produto.
5. O sistema atualiza o subtotal do item.
6. O cliente pode remover produtos do carrinho.
7. O sistema recalcula o valor total.
8. O cliente visualiza o resumo do carrinho.

**Fluxos alternativos:**

- Caso a quantidade informada seja menor ou igual a zero, o sistema não permite o registro da quantidade.
- Caso o cliente remova todos os produtos, o sistema apresenta o carrinho como vazio.

**Pós-condição:**

- O carrinho contém os produtos e quantidades selecionados pelo cliente ou está vazio caso todos os produtos tenham sido removidos.

**Requisitos relacionados:**
- RF06
- RF07
- RF08
- RF09

**Regras relacionadas:**
- RN01
- RN02
- RN04
- RN05

---

## UC04 — Realizar pedido

**Ator principal:** Cliente

**Objetivo:** Permitir que o cliente confirme a compra dos produtos selecionados.

**Pré-condições:**
- O carrinho deve possuir pelo menos um produto.
- Os produtos do carrinho devem estar disponíveis.

**Fluxo principal:**

1. O cliente acessa o carrinho.
2. O sistema apresenta os produtos, quantidades e valor total.
3. O cliente informa os dados de entrega.
4. O cliente seleciona uma forma de pagamento.
5. O sistema apresenta o resumo do pedido.
6. O cliente confirma o pedido.
7. O sistema registra o pedido.
8. O sistema registra as informações de pagamento.
9. O sistema apresenta a confirmação do pedido e sua identificação.

**Fluxos alternativos:**

- Caso o carrinho esteja vazio, o sistema não permite a confirmação do pedido.
- Caso algum dado obrigatório de entrega não seja informado, o sistema solicita seu preenchimento.
- Caso o cliente desista antes da confirmação, o pedido não é registrado.
- Caso alguma informação obrigatória seja inválida, o sistema solicita sua correção.

**Pós-condição:**

- Um novo pedido é registrado no sistema com seus respectivos itens, dados de entrega e informações de pagamento.

**Requisitos relacionados:**
- RF09
- RF10
- RF11
- RF12
- RF13
- RF14
- RF15
- RF20

**Regras relacionadas:**
- RN03
- RN04
- RN05
- RN06
- RN10
- RN11
- RN12
- RN13
- RN14

---

## UC05 — Consultar status do pedido

**Ator principal:** Cliente

**Objetivo:** Permitir que o cliente acompanhe o andamento de um pedido realizado.

**Pré-condições:**
- O cliente deve possuir pelo menos um pedido registrado.

**Fluxo principal:**

1. O cliente acessa seus pedidos.
2. O sistema apresenta os pedidos registrados.
3. O cliente seleciona um pedido.
4. O sistema apresenta os detalhes do pedido.
5. O sistema apresenta o status atual do pedido.

**Status possíveis:**

- Recebido;
- Em preparo;
- Saiu para entrega;
- Entregue;
- Cancelado.

**Fluxo alternativo:**

- Caso o cliente não possua pedidos registrados, o sistema informa que não existem pedidos disponíveis para consulta.

**Pós-condição:**

- O cliente visualiza a situação atual do pedido.

**Requisitos relacionados:**
- RF16

**Regras relacionadas:**
- RN07
- RN08
- RN09

---

## UC06 — Gerenciar produtos

**Ator principal:** Administrador

**Objetivo:** Permitir que o administrador mantenha o catálogo de cupcakes.

**Pré-condições:**

- O usuário deve estar utilizando a área administrativa do sistema.

**Fluxo principal:**

1. O administrador acessa o gerenciamento de produtos.
2. O sistema apresenta os produtos cadastrados.
3. O administrador pode cadastrar um novo produto.
4. O administrador pode editar um produto existente.
5. O administrador pode desativar um produto.
6. O sistema valida os dados informados.
7. O sistema salva a operação realizada.

**Fluxos alternativos:**

- Caso algum campo obrigatório não seja preenchido, o sistema informa o erro e solicita sua correção.
- Caso o administrador desative um produto, o produto deixa de estar disponível para novos pedidos.
- Produtos que participaram de pedidos anteriores não devem ser removidos do histórico.

**Pós-condição:**

- O catálogo é atualizado de acordo com a operação realizada.

**Requisitos relacionados:**
- RF03
- RF04
- RF05

**Regras relacionadas:**
- RN01
- RN15

---

## UC07 — Gerenciar pedidos

**Ator principal:** Administrador

**Objetivo:** Permitir que o administrador acompanhe e atualize os pedidos realizados.

**Pré-condições:**

- Deve existir pelo menos um pedido registrado.

**Fluxo principal:**

1. O administrador acessa o gerenciamento de pedidos.
2. O sistema apresenta os pedidos registrados.
3. O administrador seleciona um pedido.
4. O sistema apresenta os detalhes do pedido.
5. O administrador consulta os produtos, valores, dados de entrega e informações de pagamento.
6. O administrador atualiza o status do pedido.
7. O sistema registra a alteração.

**Fluxos alternativos:**

- Caso não existam pedidos, o sistema informa que não há pedidos registrados.
- Caso o status informado não seja válido, o sistema não permite a alteração.

**Pós-condição:**

- O pedido permanece registrado com o status atualizado.

**Requisitos relacionados:**
- RF17
- RF18
- RF19

**Regras relacionadas:**
- RN07
- RN08
- RN09
- RN15

---

# 4. Resumo dos casos de uso

| ID | Caso de uso | Ator principal |
|---|---|---|
| UC01 | Visualizar catálogo | Cliente |
| UC02 | Visualizar detalhes do produto | Cliente |
| UC03 | Gerenciar carrinho | Cliente |
| UC04 | Realizar pedido | Cliente |
| UC05 | Consultar status do pedido | Cliente |
| UC06 | Gerenciar produtos | Administrador |
| UC07 | Gerenciar pedidos | Administrador |

---

# 5. Relação entre atores e casos de uso

### Cliente

O Cliente está associado aos seguintes casos de uso:

- UC01 — Visualizar catálogo;
- UC02 — Visualizar detalhes do produto;
- UC03 — Gerenciar carrinho;
- UC04 — Realizar pedido;
- UC05 — Consultar status do pedido.

### Administrador

O Administrador está associado aos seguintes casos de uso:

- UC06 — Gerenciar produtos;
- UC07 — Gerenciar pedidos.

---

# 6. Observações

Os casos de uso representam os principais fluxos funcionais previstos para o MVP.

Com o avanço do desenvolvimento, os fluxos poderão ser refinados para contemplar detalhes de implementação identificados durante a modelagem, prototipação e testes.

Alterações relevantes nos casos de uso deverão ser refletidas também nos requisitos, regras de negócio e demais artefatos relacionados.
