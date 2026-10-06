## Testes de API

### Criação do banco de dados
![Conexão API](EV02-criacao_database.png)

### Conexão com a API realizada
![Conexão API](EV01-conexao_api_realizada.png)

### TC01 — Listar Produtos
Endpoint: GET /produtos/

Status: ✅ PASSOU
![TC01 — Listar Produtos](TC01-listar-produtos.png)

### TC02 — Criar produto
Endpoint: POST /produtos/

Status: ✅ PASSOU
![TC02 — Criar produto](TC02-criar-produto.png)

### TC03 — Buscar Produto
Endpoint: GET /produtos/{id_produto}

Status: ✅ PASSOU
![TC03 — Buscar produto](TC03-buscar-produto.png)

### TC04 — Listar Todos os Produtos
Endpoint: GET /produtos/admin/todos

Status: ✅ PASSOU
![TC04 — Listar todos os produtos](TC04-produtos_admin.png)

### TC05 — Desativar Produto
Endpoint: PATCH /produtos/{id_produto}/desativar

Status: ✅ PASSOU
![TC05 — Desativar Produto](TC05-desativar-produto.png)

### TC06 — Criar Usuário
Endpoint: POST /usuarios/

Status: ✅ PASSOU
![TC06 — Criar usuário](TC06-criar-usuario.png)

### TC07 — Buscar Usuário
Endpoint: GET /usuarios/{id_usuario}

Status: ✅ PASSOU
![TC07 — Buscar usuário](TC07-buscar-usuario.png)

### TC08 — Criar Pedido
Endpoint: POST /pedidos/

Status: ✅ PASSOU
![TC08 — Criar pedido](TC08-criar-pedido.png)

### TC09 — Buscar Pedido
Endpoint: GET /pedidos/{id_pedido}

Status: ✅ PASSOU
![TC09 — Buscar usuário](TC09-buscar-pedido.png)

### TC10 — Listar Pedidos Usuário
Endpoint: GET /pedidos/usuario/{id_usuario}

Status: ✅ PASSOU
![TC10 — Listar pedidos usuário](TC10-pedidos-usuario.png)

### TC11 — Listar Todos os Pedidos
Endpoint: GET /pedidos/admin/todos

Status: ✅ PASSOU
![TC11 — Listar todos pedidos](TC11-pedidos-admin.png)

### TC12 — Atualizar Status
Endpoint: PATCH /{id_pedido}/status

Status: ✅ PASSOU
![TC12 — Atualizar pedidos](TC12-atualizar-status.png)

### C01 — Consulta tabela de pedidos
![C01-pedidos](C01-pedidos.png)

### C02 — Consulta tabela de endereço de entrega
![C02-endereco_entrega](C02-endereco_entrega.png)

### C03 — Consulta tabela de itens do pedido
![C03-item_pedido](C03-item_pedido.png)

### C04 — Consulta tabela de pagamentos
![C04-pagamento](C04-pagamento.png)

### C05 — Consulta tabela de produtos
![C05-produto](C05-produto.png)
