
import { useEffect, useState } from 'react'
import { listarTodosProdutos, desativarProduto } from '../services/api'

function ProdutosAdmin({ onEditar, onCriarProduto, aoVoltar }) {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregarProdutos() {
    try {
      setErro('')
      const dados = await listarTodosProdutos()
      setProdutos(dados)
    } catch (erro) {
      setErro(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  async function handleDesativar(idProduto, nomeProduto) {
    const confirmado = window.confirm(
      `Tem certeza de que deseja desativar o produto "${nomeProduto}"?`
    )

    if (!confirmado) return

    try {
      await desativarProduto(idProduto)
      await carregarProdutos()
    } catch (erro) {
      setErro(erro.message)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  if (carregando) return <p>Carregando produtos...</p>

  return (
    <section className="produtos-admin">
      <h2>Gerenciar produtos</h2>

      <button type="button" onClick={onCriarProduto}>
        Cadastrar produto
      </button>

      <button type="button" onClick={aoVoltar}>
        Voltar para pedidos
      </button>

      {erro && <p>{erro}</p>}

      {!erro && produtos.length === 0 && (
        <p>Nenhum produto cadastrado.</p>
      )}

      {produtos.map((produto) => (
        <article key={produto.id_produto} className="produto-admin">
          <h3>{produto.nome}</h3>
          <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
          <p>Status: {produto.ativo ? 'Ativo' : 'Inativo'}</p>

          <button
            type="button"
            onClick={() => onEditar(produto)}
          >
            Editar
          </button>

          {produto.ativo && (
            <button
              type="button"
              onClick={() => handleDesativar(produto.id_produto, produto.nome)}
            >
              Desativar
            </button>
          )}
        </article>
      ))}
    </section>
  )
}

export default ProdutosAdmin
