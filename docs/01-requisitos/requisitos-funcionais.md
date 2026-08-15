
# Requisitos do Sistema — Cupcake Ordering System

## 1. Visão geral

O Cupcake Ordering System é uma aplicação desenvolvida para uma loja de cupcakes, com o objetivo de disponibilizar uma vitrine virtual e permitir que clientes realizem pedidos, selecionem formas de pagamento e acompanhem o status de suas entregas.

O projeto dá continuidade ao Projeto Integrador Transdisciplinar I (PI I), no qual foram levantados e organizados os requisitos iniciais da solução.

No Projeto Integrador Transdisciplinar II (PI II), os requisitos são refinados e utilizados como base para a modelagem, desenvolvimento, testes e validação da aplicação.

---

## 2. Objetivo do sistema

O sistema tem como objetivo permitir a comercialização de cupcakes por meio de uma aplicação digital, disponibilizando funcionalidades para:

- apresentação dos produtos;
- gerenciamento do carrinho;
- realização de pedidos;
- seleção da forma de pagamento;
- registro dos dados de entrega;
- acompanhamento do status dos pedidos;
- gerenciamento de produtos;
- gerenciamento de pedidos.

---

## 3. Usuários do sistema

O sistema possui dois atores principais:

### 3.1 Cliente

Usuário que consulta os produtos disponíveis e realiza pedidos.

O cliente pode:

- visualizar o catálogo;
- consultar detalhes dos produtos;
- adicionar produtos ao carrinho;
- alterar quantidades;
- remover produtos;
- visualizar o valor total;
- informar dados de entrega;
- selecionar uma forma de pagamento;
- confirmar pedidos;
- consultar o status de seus pedidos.

### 3.2 Administrador

Usuário responsável pelo gerenciamento dos produtos e pedidos da loja.

O administrador pode:

- cadastrar produtos;
- editar produtos;
- desativar produtos;
- visualizar pedidos;
- consultar detalhes dos pedidos;
- atualizar o status dos pedidos.

---

# 4. Requisitos funcionais

## RF01 — Visualizar catálogo

O sistema deve permitir que o cliente visualize os cupcakes disponíveis para compra.

## RF02 — Visualizar detalhes do produto

O sistema deve permitir que o cliente consulte informações de um cupcake, incluindo nome, descrição, preço e imagem.

## RF03 — Cadastrar produto

O sistema deve permitir que o administrador cadastre um novo cupcake.

## RF04 — Editar produto

O sistema deve permitir que o administrador altere as informações de um cupcake cadastrado.

## RF05 — Desativar produto

O sistema deve permitir que o administrador desative um cupcake, impedindo sua disponibilidade para novos pedidos sem necessariamente removê-lo do banco de dados.

## RF06 — Adicionar produto ao carrinho

O sistema deve permitir que o cliente adicione um ou mais cupcakes ao carrinho.

## RF07 — Alterar quantidade do produto

O sistema deve permitir que o cliente altere a quantidade de um produto presente no carrinho.

## RF08 — Remover produto do carrinho

O sistema deve permitir que o cliente remova produtos do carrinho.

## RF09 — Calcular total do carrinho

O sistema deve calcular automaticamente o valor total dos produtos presentes no carrinho.

## RF10 — Informar dados de entrega

O sistema deve permitir que o cliente informe os dados necessários para a entrega do pedido.

## RF11 — Revisar pedido

O sistema deve apresentar ao cliente um resumo do pedido antes de sua confirmação, contendo os produtos, quantidades e valores.

## RF12 — Selecionar forma de pagamento

O sistema deve permitir que o cliente selecione uma das formas de pagamento disponíveis.

As formas previstas para o MVP são:

- Pix;
- cartão;
- dinheiro.

## RF13 — Confirmar pedido

O sistema deve permitir que o cliente confirme o pedido após revisar seus dados e informações de compra.

## RF14 — Registrar pedido

O sistema deve registrar o pedido no banco de dados após sua confirmação.

## RF15 — Exibir confirmação do pedido

O sistema deve apresentar ao cliente uma confirmação após o registro do pedido, incluindo sua identificação.

## RF16 — Consultar status do pedido

O sistema deve permitir que o cliente consulte o status de um pedido realizado.

## RF17 — Visualizar pedidos

O sistema deve permitir que o administrador visualize os pedidos realizados.

## RF18 — Consultar detalhes do pedido

O sistema deve permitir que o administrador consulte os detalhes de um pedido, incluindo produtos, valores, dados de entrega e informações de pagamento.

## RF19 — Atualizar status do pedido

O sistema deve permitir que o administrador atualize o status de um pedido.

## RF20 — Registrar pagamento

O sistema deve registrar a forma de pagamento selecionada pelo cliente e o respectivo status do pagamento.

> **Observação:** no MVP, o pagamento será simulado/registrado no sistema. Não será implementada integração com um gateway de pagamento real.

---

# 5. Requisitos não funcionais

## RNF01 — Usabilidade

A interface deve permitir que o cliente realize um pedido de forma simples e intuitiva.

## RNF02 — Responsividade

A aplicação deve adaptar sua interface a diferentes tamanhos de tela.

## RNF03 — Desempenho

As operações comuns do sistema, como consulta de produtos e gerenciamento do carrinho, devem apresentar tempo de resposta adequado para o usuário.

## RNF04 — Integridade dos dados

O sistema deve garantir que os dados registrados sejam consistentes e que pedidos não sejam criados com informações obrigatórias ausentes ou inválidas.

## RNF05 — Manutenibilidade

A aplicação deve possuir uma organização que facilite a manutenção e futuras alterações.

## RNF06 — Versionamento

O código-fonte e a documentação do projeto devem ser mantidos em um sistema de controle de versão baseado em Git.

---

# 6. Regras de negócio

## RN01 — Disponibilidade do produto

Produtos desativados não devem ser apresentados como disponíveis para novos pedidos.

## RN02 — Quantidade do produto

A quantidade de um produto no carrinho deve ser maior que zero.

## RN03 — Carrinho vazio

O cliente não poderá confirmar um pedido caso o carrinho esteja vazio.

## RN04 — Cálculo do subtotal

O subtotal de um item do pedido deve ser calculado pela multiplicação do preço unitário pela quantidade:

**Subtotal = preço unitário × quantidade**

## RN05 — Cálculo do valor total

O valor total do pedido deve corresponder à soma dos subtotais de seus itens.

## RN06 — Preservação do preço

O preço unitário registrado em um item do pedido deve corresponder ao preço do produto no momento da compra, independentemente de alterações posteriores no preço do produto.

## RN07 — Status do pedido

Um pedido poderá possuir os seguintes status:

- Recebido;
- Em preparo;
- Saiu para entrega;
- Entregue;
- Cancelado.

## RN08 — Fluxo de status

O fluxo esperado para um pedido é:

**Recebido → Em preparo → Saiu para entrega → Entregue**

Um pedido também poderá ser marcado como **Cancelado**, conforme as regras da aplicação.

## RN09 — Persistência do pedido

Pedidos confirmados devem permanecer registrados no sistema, mesmo após serem entregues ou cancelados.

## RN10 — Endereço de entrega

Cada pedido deverá possuir um endereço de entrega associado.

## RN11 — Pagamento

Cada pedido deverá possuir um registro referente à forma e ao status do pagamento.

---

# 7. Escopo do MVP

A primeira versão funcional do sistema deverá contemplar:

- catálogo de cupcakes;
- cadastro, edição e desativação de produtos;
- carrinho de compras;
- cálculo de valores;
- realização de pedidos;
- dados de entrega;
- seleção de forma de pagamento;
- registro do pagamento;
- acompanhamento do status do pedido;
- gerenciamento de pedidos pelo administrador.

---

# 8. Funcionalidades fora do escopo do MVP

As seguintes funcionalidades não fazem parte da primeira versão:

- autenticação avançada de usuários;
- integração com gateway de pagamento real;
- rastreamento GPS de entregadores;
- integração com mapas;
- notificações por WhatsApp;
- aplicativo mobile nativo;
- sistema de cupons de desconto;
- avaliações de produtos;
- programa de fidelidade.

Essas funcionalidades poderão ser consideradas em versões futuras, caso necessário.

---

# 9. Casos de uso relacionados

Os requisitos deste documento serão utilizados como base para os seguintes casos de uso:

| ID | Caso de uso | Ator principal |
|---|---|---|
| UC01 | Visualizar catálogo | Cliente |
| UC02 | Visualizar detalhes do produto | Cliente |
| UC03 | Gerenciar carrinho | Cliente |
| UC04 | Realizar pedido | Cliente |
| UC05 | Consultar status do pedido | Cliente |
| UC06 | Gerenciar produtos | Administrador |
| UC07 | Gerenciar pedidos | Administrador |

Os casos de uso detalhados estão documentados no arquivo `casos-de-uso.md`.

---

# 10. Observações

Este documento representa a especificação de requisitos adotada para o desenvolvimento do MVP do Cupcake Ordering System no Projeto Integrador Transdisciplinar II.

Os requisitos poderão ser refinados durante as etapas de modelagem, desenvolvimento e testes, desde que as alterações sejam documentadas e permaneçam coerentes com o objetivo e o escopo do projeto.
