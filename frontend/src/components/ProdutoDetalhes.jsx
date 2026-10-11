import { useCarrinho } from '../context/CarrinhoContext'

function ProdutoDetalhes({ produto, onVoltar }) {
  const { adicionarAoCarrinho } = useCarrinho()

  return (
    <section className="produto-detalhes">
      <button type="button" onClick={onVoltar}>
        ← Voltar ao catálogo
      </button>

      {produto.imagem_url && (
        <img
          src={produto.imagem_url}
          alt={produto.nome}
          className="produto-detalhes-imagem"
        />
      )}

      <h2>{produto.nome}</h2>

      <p>{produto.descricao}</p>

      <strong>
        R$ {Number(produto.preco).toFixed(2)}
      </strong>

      <button
        type="button"
        onClick={() => adicionarAoCarrinho(produto)}
      >
        Adicionar ao carrinho
      </button>
    </section>
  )
}

export default ProdutoDetalhes