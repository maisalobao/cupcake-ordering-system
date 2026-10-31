
const API_URL = 'https://capycakes-api.onrender.com'


// ========================================
// AUTENTICAÇÃO ADMINISTRATIVA
// ========================================

export async function loginAdmin(email, senha) {
  const resposta = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(
      dados.detail || 'Erro ao realizar login.'
    )
  }

  sessionStorage.setItem('admin_token', dados.access_token)

  return dados
}


export function sairAdmin() {
  sessionStorage.removeItem('admin_token')
}


export function obterTokenAdmin() {
  return sessionStorage.getItem('admin_token')
}


// Função auxiliar para requisições administrativas
async function fetchAdmin(url, options = {}) {
  const token = obterTokenAdmin()

  const resposta = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })

  if (resposta.status === 401 || resposta.status === 403) {
    if (resposta.status === 401) {
      sairAdmin()
    }

    throw new Error(
      resposta.status === 401
        ? 'Sessão expirada. Faça login novamente.'
        : 'Acesso não autorizado.'
    )
  }

  return resposta
}


// ========================================
// PRODUTOS PÚBLICOS
// ========================================

export async function listarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos/`)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar produtos.')
  }

  return resposta.json()
}


// ========================================
// PEDIDOS PÚBLICOS
// ========================================

export async function criarPedido(pedido) {
  const resposta = await fetch(`${API_URL}/pedidos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  })

  if (!resposta.ok) {
    const erro = await resposta.json()

    const mensagem = Array.isArray(erro.detail)
      ? erro.detail.map((item) => item.msg).join(', ')
      : typeof erro.detail === 'string'
        ? erro.detail
        : 'Erro ao criar pedido. Verifique os dados informados.'

    throw new Error(mensagem)
  }

  return resposta.json()
}


export async function buscarPedido(idPedido) {
  const resposta = await fetch(
    `${API_URL}/pedidos/${idPedido}`
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Pedido não encontrado.')
  }

  return resposta.json()
}


// ========================================
// PEDIDOS ADMINISTRATIVOS
// ========================================

export async function listarTodosPedidos() {
  const resposta = await fetchAdmin(
    `${API_URL}/pedidos/admin/todos`
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Erro ao buscar pedidos.')
  }

  return resposta.json()
}


export async function buscarDetalhesPedido(idPedido) {
  const resposta = await fetchAdmin(
    `${API_URL}/pedidos/${idPedido}/detalhes`
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao buscar detalhes do pedido.'
    )
  }

  return resposta.json()
}


export async function atualizarStatusPedido(idPedido, novoStatus) {
  const resposta = await fetchAdmin(
    `${API_URL}/pedidos/${idPedido}/status?novo_status=${encodeURIComponent(novoStatus)}`,
    {
      method: 'PATCH',
    }
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao atualizar status do pedido.'
    )
  }

  return resposta.json()
}


export async function atualizarStatusPagamento(idPedido, novoStatus) {
  const resposta = await fetchAdmin(
    `${API_URL}/pedidos/${idPedido}/pagamento?novo_status=${encodeURIComponent(novoStatus)}`,
    {
      method: 'PATCH',
    }
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao atualizar o pagamento.'
    )
  }

  return resposta.json()
}


// ========================================
// PRODUTOS ADMINISTRATIVOS
// ========================================

export async function criarProduto(produto) {
  const resposta = await fetchAdmin(`${API_URL}/produtos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  })

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Erro ao criar produto.')
  }

  return resposta.json()
}


export async function atualizarProduto(idProduto, produto) {
  const resposta = await fetchAdmin(
    `${API_URL}/produtos/${idProduto}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    }
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Erro ao atualizar produto.')
  }

  return resposta.json()
}


export async function listarTodosProdutos() {
  const resposta = await fetchAdmin(
    `${API_URL}/produtos/admin/todos`
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Erro ao buscar produtos.')
  }

  return resposta.json()
}


export async function desativarProduto(idProduto) {
  const resposta = await fetchAdmin(
    `${API_URL}/produtos/${idProduto}/desativar`,
    {
      method: 'PATCH',
    }
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(erro.detail || 'Erro ao desativar produto.')
  }

  return resposta.json()
}
