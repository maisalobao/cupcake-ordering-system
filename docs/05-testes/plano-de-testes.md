# Plano de Testes — Cupcake Ordering System

## 1. Objetivo

Este documento apresenta o plano de testes do Cupcake Ordering System, descrevendo a estratégia, os tipos de teste, os casos de teste e os critérios de aceitação adotados para validar o funcionamento da aplicação.

O plano foi elaborado com base nos requisitos funcionais (RF01 a RF20), requisitos não funcionais (RNF01 a RNF06), regras de negócio (RN01 a RN15) e casos de uso (UC01 a UC07) definidos na etapa de levantamento de requisitos.

---

## 2. Escopo

O plano contempla testes sobre as funcionalidades previstas para o MVP, organizados em dois perfis de usuário:

**Cliente:** visualização do catálogo, detalhes do produto, gerenciamento do carrinho, realização do pedido (entrega, pagamento, confirmação) e consulta de status.

**Administrador:** gerenciamento de produtos (cadastro, edição, desativação) e gerenciamento de pedidos (visualização, detalhes, atualização de status).

---

## 3. Estratégia de testes

### 3.1 Tipos de teste aplicados

**Testes funcionais:** verificam se cada funcionalidade do sistema se comporta conforme o especificado nos requisitos funcionais e regras de negócio.

**Testes de integração:** verificam a comunicação entre as camadas da aplicação (frontend, backend e banco de dados).

**Testes de validação:** verificam se os dados de entrada são tratados corretamente, incluindo campos obrigatórios, formatos e restrições.

**Testes de interface:** verificam se os elementos visuais são apresentados conforme os protótipos e se a navegação entre telas funciona corretamente.

### 3.2 Abordagem

Os testes serão executados manualmente, simulando as interações dos dois perfis de usuário (Cliente e Administrador) com o sistema.

Cada caso de teste possui um identificador, descrição, pré-condições, passos, resultado esperado e resultado obtido (a ser preenchido durante a execução).

### 3.3 Ambiente de testes

O sistema será testado em ambiente local de desenvolvimento, utilizando navegadores web em resoluções de desktop e dispositivos móveis (responsividade).

---

## 4. Casos de teste

### 4.1 Catálogo e produtos (UC01, UC02)

#### CT01 — Visualizar catálogo com produtos disponíveis

**Requisitos:** RF01, RN01

**Pré-condições:** existem produtos cadastrados com status ativo.

**Passos:**

1. O cliente acessa a página inicial do sistema.
2. O sistema carrega o catálogo.

**Resultado esperado:** o sistema exibe os produtos ativos com nome, imagem e preço. Produtos desativados não são exibidos.

---

#### CT02 — Visualizar catálogo vazio

**Requisitos:** RF01

**Pré-condições:** não existem produtos ativos cadastrados.

**Passos:**

1. O cliente acessa a página inicial do sistema.

**Resultado esperado:** o sistema exibe uma mensagem informando que não há cupcakes disponíveis.

---

#### CT03 — Visualizar detalhes de um produto

**Requisitos:** RF02

**Pré-condições:** o produto está cadastrado e ativo.

**Passos:**

1. O cliente acessa o catálogo.
2. O cliente seleciona um cupcake.

**Resultado esperado:** o sistema exibe nome, descrição, preço e imagem do produto selecionado.

---

### 4.2 Carrinho (UC03)

#### CT04 — Adicionar produto ao carrinho

**Requisitos:** RF06, RN02

**Pré-condições:** o produto está disponível para compra.

**Passos:**

1. O cliente acessa os detalhes de um produto.
2. O cliente define a quantidade desejada.
3. O cliente clica em "Adicionar ao carrinho".

**Resultado esperado:** o produto é adicionado ao carrinho com a quantidade informada.

---

#### CT05 — Adicionar produto com quantidade inválida

**Requisitos:** RF06, RN02

**Pré-condições:** o produto está disponível para compra.

**Passos:**

1. O cliente acessa os detalhes de um produto.
2. O cliente tenta definir a quantidade como zero ou valor negativo.

**Resultado esperado:** o sistema não permite o registro da quantidade inválida.

---

#### CT06 — Alterar quantidade de um produto no carrinho

**Requisitos:** RF07, RN02

**Pré-condições:** o carrinho possui ao menos um produto.

**Passos:**

1. O cliente acessa o carrinho.
2. O cliente altera a quantidade de um produto.

**Resultado esperado:** o subtotal do item e o valor total do carrinho são recalculados automaticamente.

---

#### CT07 — Remover produto do carrinho

**Requisitos:** RF08

**Pré-condições:** o carrinho possui ao menos um produto.

**Passos:**

1. O cliente acessa o carrinho.
2. O cliente remove um produto.

**Resultado esperado:** o produto é removido e o valor total é recalculado. Se era o último item, o carrinho é exibido como vazio.

---

#### CT08 — Verificar cálculo do total do carrinho

**Requisitos:** RF09, RN04, RN05

**Pré-condições:** o carrinho possui dois ou mais produtos com quantidades variadas.

**Passos:**

1. O cliente acessa o carrinho.
2. O cliente verifica os subtotais e o total.

**Resultado esperado:** cada subtotal corresponde a quantidade x preço unitário. O total corresponde à soma de todos os subtotais.

---

### 4.3 Realizar pedido (UC04)

#### CT09 — Informar dados de entrega

**Requisitos:** RF10, RN10

**Pré-condições:** o carrinho possui ao menos um produto.

**Passos:**

1. O cliente avança para a etapa de entrega.
2. O cliente preenche todos os campos obrigatórios do endereço (logradouro, número, bairro, cidade, estado, CEP).

**Resultado esperado:** o sistema aceita os dados e permite avançar para a próxima etapa.

---

#### CT10 — Informar dados de entrega com campos obrigatórios vazios

**Requisitos:** RF10, RN10

**Pré-condições:** o carrinho possui ao menos um produto.

**Passos:**

1. O cliente avança para a etapa de entrega.
2. O cliente deixa um ou mais campos obrigatórios em branco.
3. O cliente tenta avançar.

**Resultado esperado:** o sistema informa quais campos precisam ser preenchidos e não permite avançar.

---

#### CT11 — Selecionar forma de pagamento

**Requisitos:** RF12, RN11

**Pré-condições:** os dados de entrega foram preenchidos.

**Passos:**

1. O cliente avança para a etapa de pagamento.
2. O cliente seleciona uma das formas disponíveis (PIX, Cartão ou Dinheiro).

**Resultado esperado:** a forma de pagamento selecionada é registrada e o sistema permite avançar.

---

#### CT12 — Revisar resumo do pedido

**Requisitos:** RF11

**Pré-condições:** dados de entrega e forma de pagamento foram informados.

**Passos:**

1. O cliente avança para a etapa de confirmação.
2. O sistema exibe o resumo do pedido.

**Resultado esperado:** o resumo contém a lista de itens com quantidades e preços, o endereço de entrega, a forma de pagamento e o valor total.

---

#### CT13 — Confirmar pedido com carrinho válido

**Requisitos:** RF13, RF14, RF15, RF20, RN03, RN06, RN09, RN13

**Pré-condições:** o resumo do pedido está sendo exibido com dados completos.

**Passos:**

1. O cliente clica em "Confirmar pedido".

**Resultado esperado:** o sistema registra o pedido no banco de dados (incluindo itens, endereço e pagamento), exibe a tela de confirmação com o número do pedido e o status inicial do pedido é "RECEBIDO". O preço unitário registrado nos itens corresponde ao preço do produto no momento da compra.

---

#### CT14 — Tentar confirmar pedido com carrinho vazio

**Requisitos:** RF13, RN03

**Pré-condições:** o carrinho está vazio.

**Passos:**

1. O cliente tenta avançar para finalizar o pedido.

**Resultado esperado:** o sistema não permite a confirmação e informa que o carrinho está vazio.

---

### 4.4 Consultar status do pedido (UC05)

#### CT15 — Consultar lista de pedidos do cliente

**Requisitos:** RF16, RN07

**Pré-condições:** o cliente possui ao menos um pedido registrado.

**Passos:**

1. O cliente acessa a área "Meus Pedidos".

**Resultado esperado:** o sistema exibe a lista de pedidos do cliente, com número, data e status atual de cada um.

---

#### CT16 — Consultar detalhes de um pedido

**Requisitos:** RF16, RN07, RN08

**Pré-condições:** o cliente possui ao menos um pedido registrado.

**Passos:**

1. O cliente acessa "Meus Pedidos".
2. O cliente seleciona um pedido.

**Resultado esperado:** o sistema exibe os detalhes do pedido, incluindo itens, valores, endereço de entrega e status atual.

---

#### CT17 — Consultar pedidos sem histórico

**Requisitos:** RF16

**Pré-condições:** o cliente não possui pedidos registrados.

**Passos:**

1. O cliente acessa a área "Meus Pedidos".

**Resultado esperado:** o sistema informa que não há pedidos registrados.

---

### 4.5 Gerenciar produtos — Administrador (UC06)

#### CT18 — Cadastrar novo produto

**Requisitos:** RF03

**Pré-condições:** o administrador está na área de gerenciamento de produtos.

**Passos:**

1. O administrador clica em "Novo produto".
2. O administrador preenche nome, descrição, preço e imagem.
3. O administrador clica em "Salvar".

**Resultado esperado:** o produto é cadastrado com status ativo e passa a ser exibido no catálogo.

---

#### CT19 — Cadastrar produto com campos obrigatórios vazios

**Requisitos:** RF03

**Pré-condições:** o administrador está no formulário de cadastro.

**Passos:**

1. O administrador deixa o campo "nome" ou "preço" em branco.
2. O administrador tenta salvar.

**Resultado esperado:** o sistema informa quais campos são obrigatórios e não permite o cadastro.

---

#### CT20 — Editar produto existente

**Requisitos:** RF04

**Pré-condições:** o produto está cadastrado.

**Passos:**

1. O administrador seleciona um produto.
2. O administrador altera o nome ou o preço.
3. O administrador salva as alterações.

**Resultado esperado:** os dados do produto são atualizados no sistema.

---

#### CT21 — Desativar produto

**Requisitos:** RF05, RN01, RN15

**Pré-condições:** o produto está cadastrado e ativo.

**Passos:**

1. O administrador desativa o produto.

**Resultado esperado:** o produto deixa de ser exibido no catálogo para novos pedidos, mas permanece registrado no banco de dados. Pedidos anteriores que incluem esse produto não são alterados.

---

### 4.6 Gerenciar pedidos — Administrador (UC07)

#### CT22 — Visualizar lista de pedidos

**Requisitos:** RF17

**Pré-condições:** existem pedidos registrados no sistema.

**Passos:**

1. O administrador acessa a área de gerenciamento de pedidos.

**Resultado esperado:** o sistema exibe a lista de pedidos com número, nome do cliente, valor e status.

---

#### CT23 — Consultar detalhes de um pedido

**Requisitos:** RF18

**Pré-condições:** existem pedidos registrados.

**Passos:**

1. O administrador seleciona um pedido.

**Resultado esperado:** o sistema exibe os detalhes completos do pedido, incluindo itens, quantidades, valores, endereço de entrega, forma de pagamento e status do pagamento.

---

#### CT24 — Atualizar status do pedido (fluxo válido)

**Requisitos:** RF19, RN07, RN08

**Pré-condições:** o pedido está com status "RECEBIDO".

**Passos:**

1. O administrador seleciona o pedido.
2. O administrador altera o status para "EM_PREPARO".
3. O administrador confirma a atualização.

**Resultado esperado:** o status do pedido é atualizado para "EM_PREPARO". A alteração é refletida tanto na visão do administrador quanto na consulta do cliente.

---

#### CT25 — Verificar fluxo completo de status

**Requisitos:** RF19, RN08

**Pré-condições:** o pedido está com status "RECEBIDO".

**Passos:**

1. O administrador atualiza o status sequencialmente: RECEBIDO, EM_PREPARO, SAIU_PARA_ENTREGA, ENTREGUE.

**Resultado esperado:** cada transição é aceita e registrada. O pedido permanece no sistema após ser marcado como "ENTREGUE" (RN09).

---

#### CT26 — Atualizar status para CANCELADO

**Requisitos:** RF19, RN07, RN09

**Pré-condições:** o pedido está com status diferente de "ENTREGUE".

**Passos:**

1. O administrador altera o status para "CANCELADO".

**Resultado esperado:** o status é atualizado para "CANCELADO". O pedido permanece registrado no sistema.

---

### 4.7 Testes de validação e integridade

#### CT27 — Preservação do preço do pedido

**Requisitos:** RN06

**Pré-condições:** um pedido foi realizado com um produto a R$ 12,90.

**Passos:**

1. O administrador altera o preço do produto para R$ 15,90.
2. O cliente consulta o pedido realizado anteriormente.

**Resultado esperado:** o pedido anterior mantém o preço unitário de R$ 12,90 registrado no momento da compra.

---

#### CT28 — Persistência do pedido após entrega

**Requisitos:** RN09

**Pré-condições:** um pedido foi marcado como "ENTREGUE".

**Passos:**

1. O administrador acessa a lista de pedidos.

**Resultado esperado:** o pedido entregue continua registrado e visível na lista.

---

#### CT29 — Produto desativado em pedidos anteriores

**Requisitos:** RN15

**Pré-condições:** um produto participou de um pedido e foi posteriormente desativado.

**Passos:**

1. O administrador consulta o pedido que contém o produto desativado.

**Resultado esperado:** o pedido exibe corretamente o produto, suas quantidades e valores, independentemente da desativação.

---

### 4.8 Testes de interface e responsividade

#### CT30 — Navegação entre telas do cliente

**Requisitos:** RNF01

**Passos:**

1. Navegar por todo o fluxo: catálogo, detalhes, carrinho, checkout (entrega, pagamento, resumo), confirmação, meus pedidos.

**Resultado esperado:** todas as transições entre telas funcionam corretamente, sem erros de carregamento ou elementos ausentes.

---

#### CT31 — Responsividade da interface

**Requisitos:** RNF02

**Passos:**

1. Acessar o sistema em resolução de desktop (1366x768 ou superior).
2. Acessar o sistema em resolução mobile (375x667 ou similar).

**Resultado esperado:** a interface se adapta aos diferentes tamanhos de tela, mantendo a usabilidade e a legibilidade do conteúdo.

---

## 5. Rastreabilidade

| Caso de teste | Requisitos funcionais | Regras de negócio | Caso de uso |
|---|---|---|---|
| CT01 | RF01 | RN01 | UC01 |
| CT02 | RF01 | — | UC01 |
| CT03 | RF02 | — | UC02 |
| CT04 | RF06 | RN02 | UC03 |
| CT05 | RF06 | RN02 | UC03 |
| CT06 | RF07 | RN02 | UC03 |
| CT07 | RF08 | — | UC03 |
| CT08 | RF09 | RN04, RN05 | UC03 |
| CT09 | RF10 | RN10 | UC04 |
| CT10 | RF10 | RN10 | UC04 |
| CT11 | RF12 | RN11 | UC04 |
| CT12 | RF11 | — | UC04 |
| CT13 | RF13, RF14, RF15, RF20 | RN03, RN06, RN09, RN13 | UC04 |
| CT14 | RF13 | RN03 | UC04 |
| CT15 | RF16 | RN07 | UC05 |
| CT16 | RF16 | RN07, RN08 | UC05 |
| CT17 | RF16 | — | UC05 |
| CT18 | RF03 | — | UC06 |
| CT19 | RF03 | — | UC06 |
| CT20 | RF04 | — | UC06 |
| CT21 | RF05 | RN01, RN15 | UC06 |
| CT22 | RF17 | — | UC07 |
| CT23 | RF18 | — | UC07 |
| CT24 | RF19 | RN07, RN08 | UC07 |
| CT25 | RF19 | RN08 | UC07 |
| CT26 | RF19 | RN07, RN09 | UC07 |
| CT27 | — | RN06 | — |
| CT28 | — | RN09 | — |
| CT29 | — | RN15 | — |
| CT30 | — | — | UC01 a UC05 |
| CT31 | — | — | — |

---

## 6. Critérios de aceitação

O sistema será considerado aprovado quando:

1. Todos os casos de teste funcionais (CT01 a CT26) forem executados com resultado "Aprovado".
2. Todos os testes de validação e integridade (CT27 a CT29) forem executados com resultado "Aprovado".
3. Os testes de interface e responsividade (CT30 e CT31) forem executados sem falhas críticas de navegação ou layout.
4. Nenhum defeito de severidade alta permanecer em aberto ao final do ciclo de testes.

---

## 7. Registro de resultados

Os resultados de cada caso de teste serão registrados no diretório `docs/05-testes/resultados/`, contendo:

- identificação do caso de teste;
- data de execução;
- resultado obtido (Aprovado / Reprovado);
- observações ou evidências, quando aplicável.

---

## 8. Considerações

O plano de testes cobre os fluxos principais e as validações mais relevantes para o MVP.

Cenários adicionais poderão ser incorporados caso novas funcionalidades sejam implementadas ou novos comportamentos sejam identificados durante o desenvolvimento.

Alterações nos requisitos ou regras de negócio deverão ser refletidas neste plano para manter a consistência entre os artefatos do projeto.
