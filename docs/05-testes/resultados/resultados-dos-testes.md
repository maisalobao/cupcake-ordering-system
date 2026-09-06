# Resultados dos Testes — Cupcake Ordering System

## 1. Objetivo

Este documento registra os resultados da execução dos casos de teste definidos no plano de testes do Cupcake Ordering System.

Os testes foram executados manualmente sobre a versão MVP da aplicação, simulando as interações dos perfis Cliente e Administrador.

---

## 2. Informações da execução

| Item | Descrição |
|---|---|
| Data de execução | 06/09/2026 |
| Ambiente | Local (localhost) |
| Navegador | Google Chrome 128 |
| Responsável | Maísa Lobão |
| Versão testada | MVP — branch main |

---

## 3. Resumo geral

| Categoria | Total | Aprovados | Reprovados |
|---|---|---|---|
| Catálogo e produtos | 3 | 3 | 0 |
| Carrinho | 5 | 5 | 0 |
| Realizar pedido | 6 | 6 | 0 |
| Consultar status | 3 | 3 | 0 |
| Gerenciar produtos (admin) | 4 | 4 | 0 |
| Gerenciar pedidos (admin) | 5 | 5 | 0 |
| Validação e integridade | 3 | 3 | 0 |
| Interface e responsividade | 2 | 2 | 0 |
| **Total** | **31** | **31** | **0** |

---

## 4. Resultados detalhados

### 4.1 Catálogo e produtos

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT01 | Visualizar catálogo com produtos disponíveis | Aprovado | Produtos ativos foram exibidos corretamente com nome, imagem e preço. Produtos desativados não apareceram no catálogo. |
| CT02 | Visualizar catálogo vazio | Aprovado | O sistema exibiu a mensagem "Não há cupcakes disponíveis" quando nenhum produto ativo existia no banco. |
| CT03 | Visualizar detalhes de um produto | Aprovado | Nome, descrição, preço e imagem foram apresentados corretamente ao selecionar um cupcake. |

---

### 4.2 Carrinho

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT04 | Adicionar produto ao carrinho | Aprovado | O produto foi adicionado com a quantidade informada. O carrinho refletiu a adição imediatamente. |
| CT05 | Adicionar produto com quantidade inválida | Aprovado | O sistema impediu o registro de quantidade zero ou negativa. O botão de diminuir quantidade ficou desabilitado ao atingir 1. |
| CT06 | Alterar quantidade de um produto no carrinho | Aprovado | O subtotal do item e o valor total do carrinho foram recalculados automaticamente ao alterar a quantidade. |
| CT07 | Remover produto do carrinho | Aprovado | O produto foi removido e o total foi recalculado. Ao remover o último item, o carrinho foi exibido como vazio com mensagem orientativa. |
| CT08 | Verificar cálculo do total do carrinho | Aprovado | Subtotais individuais correspondem a quantidade x preço unitário. O total corresponde à soma dos subtotais. Testado com 3 produtos e quantidades variadas. |

---

### 4.3 Realizar pedido

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT09 | Informar dados de entrega | Aprovado | Todos os campos obrigatórios foram preenchidos e o sistema permitiu avançar para a etapa de pagamento. |
| CT10 | Informar dados de entrega com campos obrigatórios vazios | Aprovado | O sistema destacou os campos não preenchidos e exibiu mensagem de validação. Não permitiu avançar até o preenchimento completo. |
| CT11 | Selecionar forma de pagamento | Aprovado | As três formas de pagamento (PIX, Cartão, Dinheiro) foram exibidas e a seleção foi registrada corretamente. |
| CT12 | Revisar resumo do pedido | Aprovado | O resumo apresentou corretamente a lista de itens com quantidades e preços, o endereço de entrega, a forma de pagamento selecionada e o valor total. |
| CT13 | Confirmar pedido com carrinho válido | Aprovado | O pedido foi registrado no banco de dados com status "RECEBIDO". A tela de confirmação exibiu o número do pedido. Os itens registrados mantiveram o preço unitário do momento da compra. O registro de pagamento foi criado com status "PENDENTE". |
| CT14 | Tentar confirmar pedido com carrinho vazio | Aprovado | O botão "Finalizar pedido" ficou desabilitado com o carrinho vazio. O sistema não permitiu avançar para o checkout. |

---

### 4.4 Consultar status do pedido

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT15 | Consultar lista de pedidos do cliente | Aprovado | A lista de pedidos foi exibida com número, data e status atual. A ordenação apresentou os pedidos mais recentes primeiro. |
| CT16 | Consultar detalhes de um pedido | Aprovado | Os detalhes do pedido foram exibidos corretamente, incluindo itens, valores, endereço de entrega e status atual. |
| CT17 | Consultar pedidos sem histórico | Aprovado | O sistema exibiu a mensagem "Você ainda não realizou nenhum pedido" quando não havia pedidos registrados para o cliente. |

---

### 4.5 Gerenciar produtos (Administrador)

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT18 | Cadastrar novo produto | Aprovado | O produto foi cadastrado com status ativo e passou a ser exibido no catálogo do cliente. |
| CT19 | Cadastrar produto com campos obrigatórios vazios | Aprovado | O sistema indicou os campos obrigatórios (nome e preço) e não permitiu o cadastro sem o preenchimento. |
| CT20 | Editar produto existente | Aprovado | O nome e o preço do produto foram alterados e as mudanças foram refletidas no catálogo. |
| CT21 | Desativar produto | Aprovado | O produto desativado deixou de ser exibido no catálogo. O registro permaneceu no banco de dados. Pedidos anteriores que continham o produto não foram afetados. |

---

### 4.6 Gerenciar pedidos (Administrador)

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT22 | Visualizar lista de pedidos | Aprovado | A lista exibiu todos os pedidos com número, nome do cliente, valor e status. |
| CT23 | Consultar detalhes de um pedido | Aprovado | O sistema apresentou itens, quantidades, valores, endereço de entrega, forma de pagamento e status do pagamento. |
| CT24 | Atualizar status do pedido (fluxo válido) | Aprovado | O status foi atualizado de "RECEBIDO" para "EM_PREPARO". A alteração foi refletida na visão do administrador e na consulta do cliente. |
| CT25 | Verificar fluxo completo de status | Aprovado | Todas as transições foram aceitas na sequência: RECEBIDO, EM_PREPARO, SAIU_PARA_ENTREGA, ENTREGUE. O pedido permaneceu registrado após ser marcado como entregue. |
| CT26 | Atualizar status para CANCELADO | Aprovado | O pedido foi marcado como "CANCELADO" e permaneceu registrado no sistema para consulta. |

---

### 4.7 Validação e integridade

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT27 | Preservação do preço do pedido | Aprovado | O preço do produto foi alterado de R$ 12,90 para R$ 15,90. O pedido realizado anteriormente manteve o preço unitário de R$ 12,90 nos itens registrados. |
| CT28 | Persistência do pedido após entrega | Aprovado | Pedidos com status "ENTREGUE" permaneceram visíveis na lista de pedidos do administrador e do cliente. |
| CT29 | Produto desativado em pedidos anteriores | Aprovado | O pedido contendo o produto desativado continuou exibindo corretamente o nome, a quantidade e os valores do produto. |

---

### 4.8 Interface e responsividade

| ID | Caso de teste | Resultado | Observações |
|---|---|---|---|
| CT30 | Navegação entre telas do cliente | Aprovado | Todas as transições entre telas funcionaram corretamente: catálogo, detalhes, carrinho, checkout (entrega, pagamento, resumo), confirmação e meus pedidos. Botões de voltar e navegação inferior operaram sem falhas. |
| CT31 | Responsividade da interface | Aprovado | A interface se adaptou corretamente em resolução desktop (1366x768) e mobile (375x667). Elementos mantiveram legibilidade e usabilidade em ambas as resoluções. |

---

## 5. Defeitos identificados

Nenhum defeito foi identificado durante a execução dos testes.

---

## 6. Conclusão

Todos os 31 casos de teste previstos no plano foram executados e obtiveram resultado "Aprovado".

O sistema atende aos requisitos funcionais (RF01 a RF20), respeita as regras de negócio (RN01 a RN15) e apresenta comportamento consistente nos fluxos dos casos de uso (UC01 a UC07).

A aplicação está em conformidade com os critérios de aceitação definidos no plano de testes e pode avançar para a etapa de documentação final e laudo de qualidade.
