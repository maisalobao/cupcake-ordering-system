const API_URL = 'http://localhost:8000'

export async function listarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos/`)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar produtos.')
  }

  return resposta.json()
}

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
    throw new Error(erro.detail || 'Erro ao criar pedido.')
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

export async function listarTodosPedidos() {
  const resposta = await fetch(
    `${API_URL}/pedidos/admin/todos`
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao buscar pedidos.'
    )
  }

  return resposta.json()
}

export async function buscarDetalhesPedido(idPedido) {
  const resposta = await fetch(
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

export async function atualizarStatusPedido(
  idPedido,
  novoStatus
) {
  const resposta = await fetch(
    `${API_URL}/pedidos/${idPedido}/status?novo_status=${novoStatus}`,
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

export async function criarProduto(produto) {
  const resposta = await fetch(`${API_URL}/produtos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  })

  if (!resposta.ok) {
    const erro = await resposta.json()

    throw new Error(
      erro.detail || 'Erro ao criar produto.'
    )
  }

  return resposta.json()
}

export async function atualizarProduto(idProduto, produto) {
  const resposta = await fetch(
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

    throw new Error(
      erro.detail || 'Erro ao atualizar produto.'
    )
  }

  return resposta.json()
}


export async function listarTodosProdutos() {
  const resposta = await fetch(`${API_URL}/produtos/admin/todos`)

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao buscar produtos.'
    )
  }

  return resposta.json()
}


export async function desativarProduto(idProduto) {
  const resposta = await fetch(
    `${API_URL}/produtos/${idProduto}/desativar`,
    {
      method: 'PATCH',
    }
  )

  if (!resposta.ok) {
    const erro = await resposta.json()
    throw new Error(
      erro.detail || 'Erro ao desativar produto.'
    )
  }

  return resposta.json()
}


export async function atualizarStatusPagamento(idPedido, novoStatus) {
  const resposta = await fetch(
    `${API_URL}/pedidos/${idPedido}/pagamento?novo_status=${novoStatus}`,
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
