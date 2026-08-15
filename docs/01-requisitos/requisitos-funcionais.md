
# Requisitos Funcionais do Sistema — Cupcake Ordering System

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

# 10. Observações

Este documento representa a especificação de requisitos adotada para o desenvolvimento do MVP do Cupcake Ordering System no Projeto Integrador Transdisciplinar II.

Os requisitos poderão ser refinados durante as etapas de modelagem, desenvolvimento e testes, desde que as alterações sejam documentadas e permaneçam coerentes com o objetivo e o escopo do projeto.
