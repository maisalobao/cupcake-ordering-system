# Laudo de Qualidade — Cupcake Ordering System

## 1. Objetivo

Este documento apresenta a avaliação de qualidade do Cupcake Ordering System, analisando o produto desenvolvido sob os critérios de funcionalidade, usabilidade, confiabilidade, manutenibilidade e documentação.

O laudo foi elaborado com base nos artefatos produzidos ao longo do Projeto Integrador Transdisciplinar II (PI II) e nos resultados obtidos na etapa de testes.

---

## 2. Identificação do projeto

| Item | Descrição |
|---|---|
| Projeto | Cupcake Ordering System |
| Disciplina | Projeto Integrador Transdisciplinar II em Engenharia de Software |
| Tipo de aplicação | Aplicação web |
| Versão avaliada | MVP — branch main |
| Repositório | github.com/maisalobao/cupcake-ordering-system |
| Data do laudo | 06/09/2026 |

---

## 3. Artefatos avaliados

O laudo considera os seguintes artefatos produzidos durante o projeto:

**Requisitos:** requisitos funcionais (RF01 a RF20), requisitos não funcionais (RNF01 a RNF06), regras de negócio (RN01 a RN15) e casos de uso (UC01 a UC07).

**Modelagem:** dicionário de dados com seis entidades (usuario, produto, pedido, item_pedido, endereco_entrega, pagamento), quatro enumeradores e mapeamento de relacionamentos.

**Diagramas UML:** diagrama de casos de uso, diagrama de classes e cinco diagramas de sequência cobrindo os fluxos principais do sistema.

**Protótipos:** doze wireframes (baixa fidelidade) e doze telas de alta fidelidade, contemplando os fluxos do Cliente e do Administrador.

**Testes:** plano de testes com 31 casos de teste e documento de resultados com registro individual de cada execução.

---

## 4. Critérios de avaliação

A avaliação adota como referência as características de qualidade definidas pela norma ISO/IEC 25010, adaptadas ao contexto e ao escopo do MVP acadêmico.

---

### 4.1 Funcionalidade

**Critério:** o sistema implementa corretamente as funcionalidades especificadas nos requisitos funcionais e respeita as regras de negócio.

**Avaliação:**

Os 20 requisitos funcionais definidos para o MVP foram contemplados na modelagem, nos protótipos e nos casos de teste. A execução dos testes funcionais (CT01 a CT26) resultou em aprovação em todos os cenários, incluindo fluxos principais e fluxos alternativos.

As 15 regras de negócio foram verificadas por meio dos testes de validação e integridade (CT27 a CT29) e dos testes funcionais que exercitam as regras diretamente, como cálculo de subtotal (RN04, RN05), preservação de preço (RN06), fluxo de status (RN07, RN08) e persistência de pedidos (RN09).

**Resultado:** Conforme.

---

### 4.2 Usabilidade

**Critério:** a interface permite que os usuários realizem suas tarefas de forma simples, intuitiva e sem ambiguidade.

**Avaliação:**

Os protótipos de alta fidelidade demonstram uma interface organizada com hierarquia visual clara, navegação consistente entre telas e indicadores de progresso no fluxo de checkout (entrega, pagamento, confirmação).

O fluxo do Cliente segue uma sequência linear e previsível: catálogo, detalhes, carrinho, checkout em três etapas, confirmação e consulta de pedidos. A navegação inferior oferece acesso direto às três áreas principais.

O fluxo do Administrador apresenta as operações de gerenciamento com ações acessíveis (cadastrar, editar, desativar, atualizar status) e feedback visual por meio de badges de status.

O teste de navegação (CT30) confirmou que todas as transições entre telas funcionam corretamente.

**Resultado:** Conforme.

---

### 4.3 Responsividade

**Critério:** a interface se adapta a diferentes tamanhos de tela, mantendo a usabilidade e a legibilidade.

**Avaliação:**

Os protótipos foram concebidos com foco em dispositivos móveis (390x844) e o requisito não funcional RNF02 exige adaptação a diferentes resoluções.

O teste de responsividade (CT31) verificou o comportamento da interface em resoluções de desktop (1366x768) e mobile (375x667), com resultado aprovado em ambas.

**Resultado:** Conforme.

---

### 4.4 Confiabilidade

**Critério:** o sistema mantém a integridade dos dados e se comporta de forma consistente diante de entradas válidas e inválidas.

**Avaliação:**

Os testes de validação confirmaram que o sistema trata corretamente entradas inválidas: campos obrigatórios vazios no checkout (CT10) e no cadastro de produtos (CT19), quantidade inválida no carrinho (CT05) e tentativa de confirmar pedido com carrinho vazio (CT14).

Os testes de integridade confirmaram a preservação do preço nos itens do pedido após alteração do produto (CT27), a persistência de pedidos após entrega (CT28) e a manutenção do histórico de pedidos com produtos desativados (CT29).

O requisito não funcional RNF04 (integridade dos dados) foi atendido pela modelagem do banco de dados, que utiliza chaves estrangeiras, restrições de obrigatoriedade e valores padrão documentados no dicionário de dados.

**Resultado:** Conforme.

---

### 4.5 Manutenibilidade

**Critério:** o projeto está organizado de forma que facilite a compreensão, a manutenção e futuras alterações.

**Avaliação:**

A estrutura do repositório segue uma separação clara entre documentação (docs/), frontend, backend e database. A documentação está organizada em subdiretórios temáticos (requisitos, modelagem, UML, protótipos, testes, qualidade), facilitando a localização dos artefatos.

O código-fonte e a documentação são mantidos sob controle de versão Git (RNF06), com histórico de commits no repositório público.

O diagrama de classes e o dicionário de dados fornecem uma visão completa da estrutura do sistema, permitindo que novos desenvolvedores compreendam a arquitetura sem dependência de conhecimento oral.

A rastreabilidade entre artefatos (requisitos, regras, casos de uso, casos de teste) está documentada em tabelas nos próprios documentos, o que facilita a análise de impacto em caso de alterações.

**Resultado:** Conforme.

---

### 4.6 Documentação

**Critério:** o projeto possui documentação suficiente para compreender, utilizar, manter e evoluir o sistema.

**Avaliação:**

O conjunto de documentos produzidos cobre todas as etapas do ciclo previsto para o PI II:

| Etapa | Artefatos produzidos |
|---|---|
| Requisitos | Requisitos funcionais, requisitos não funcionais, regras de negócio, casos de uso |
| Modelagem | Dicionário de dados (entidades, atributos, tipos, restrições, relacionamentos) |
| UML | Diagrama de casos de uso, diagrama de classes, 5 diagramas de sequência |
| Protótipos | 12 wireframes (baixa fidelidade), 12 telas (alta fidelidade) |
| Testes | Plano de testes (31 casos), resultados dos testes |
| Qualidade | Laudo de qualidade (este documento) |

Todos os documentos seguem uma estrutura padronizada, com objetivo, conteúdo organizado por seções e referências cruzadas aos demais artefatos.

**Resultado:** Conforme.

---

## 5. Matriz de conformidade

| Critério | Referência | Resultado |
|---|---|---|
| Funcionalidade | RF01 a RF20, RN01 a RN15 | Conforme |
| Usabilidade | RNF01, protótipos, CT30 | Conforme |
| Responsividade | RNF02, CT31 | Conforme |
| Confiabilidade | RNF04, CT05, CT10, CT14, CT19, CT27, CT28, CT29 | Conforme |
| Manutenibilidade | RNF05, RNF06, estrutura do repositório | Conforme |
| Documentação | Artefatos do projeto | Conforme |

---

## 6. Pontos de atenção e recomendações

Embora o MVP tenha sido aprovado em todos os critérios avaliados, os seguintes pontos são registrados como recomendações para evolução futura:

**Autenticação e autorização:** o MVP não implementa um sistema de autenticação. Em uma versão de produção, seria necessário controlar o acesso às áreas do Cliente e do Administrador com login, registro e controle de sessão.

**Integração de pagamento:** o pagamento é simulado no MVP (RN13). A integração com um gateway de pagamento real (Stripe, Mercado Pago, PagSeguro) seria necessária para viabilizar o uso comercial.

**Testes automatizados:** os testes foram executados manualmente. A adoção de testes automatizados (unitários e de integração) aumentaria a confiabilidade do processo de validação em ciclos futuros de desenvolvimento.

**Persistência do carrinho:** o carrinho opera apenas no lado do cliente (frontend). A persistência do carrinho no banco de dados permitiria recuperação de sessão e análise de abandono.

**Acessibilidade:** a avaliação de acessibilidade (contraste, navegação por teclado, leitores de tela) não fez parte do escopo do MVP, mas é recomendada para versões futuras.

---

## 7. Conclusão

O Cupcake Ordering System, na versão MVP desenvolvida para o Projeto Integrador Transdisciplinar II, atende aos critérios de qualidade avaliados neste laudo.

O sistema contempla os requisitos funcionais e não funcionais especificados, respeita as regras de negócio definidas, apresenta uma interface coerente com os protótipos projetados e foi validado por meio de 31 casos de teste executados com aprovação integral.

A documentação produzida ao longo do projeto cobre as etapas de requisitos, modelagem, diagramação UML, prototipação, testes e qualidade, formando um conjunto rastreável e coeso.

O projeto está apto a ser apresentado como entrega final da disciplina.
