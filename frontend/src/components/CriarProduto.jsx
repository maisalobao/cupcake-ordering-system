
import { useEffect, useState } from 'react'
import { criarProduto, atualizarProduto } from '../services/api'

function CriarProduto({
  onProdutoCriado,
  produtoParaEditar = null,
  onProdutoAtualizado,
}) {
  const editando = Boolean(produtoParaEditar)

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome)
      setDescricao(produtoParaEditar.descricao ?? '')
      setPreco(String(produtoParaEditar.preco))
      setImagemUrl(produtoParaEditar.imagem_url ?? '')
    } else {
      setNome('')
      setDescricao('')
      setPreco('')
      setImagemUrl('')
    }

    setMensagem('')
    setErro('')
  }, [produtoParaEditar])

  async function salvarProduto(event) {
    event.preventDefault()
    setMensagem('')
    setErro('')
    setSalvando(true)

    try {
      const produto = {
        nome,
        descricao: descricao || null,
        preco: Number(preco),
        imagem_url: imagemUrl || null,
      }

      if (editando) {
        await atualizarProduto(produtoParaEditar.id_produto, produto)
        setMensagem('Produto atualizado com sucesso.')
        if (onProdutoAtualizado) onProdutoAtualizado()
      } else {
        await criarProduto(produto)
        setMensagem('Produto cadastrado com sucesso.')
        if (onProdutoCriado) onProdutoCriado()
      }
    } catch (erro) {
      setErro(erro.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <section className="criar-produto">
      <h2>
        {editando
          ? `Editar produto #${produtoParaEditar.id_produto}`
          : 'Cadastrar produto'}
      </h2>

      <form onSubmit={salvarProduto}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        <label>
          Preço
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </label>

        <label>
          URL da imagem
          <input
            type="url"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
          />
        </label>

        <button type="submit" disabled={salvando}>
          {salvando
            ? 'Salvando...'
            : editando
              ? 'Salvar alterações'
              : 'Cadastrar produto'}
        </button>

        <button
          type="button"
          onClick={editando ? onProdutoAtualizado : onProdutoCriado}
          disabled={salvando}
        >
          Voltar
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}
      {erro && <p>{erro}</p>}
    </section>
  )
}

export default CriarProduto
