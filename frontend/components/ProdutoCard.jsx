import { useCarrinho } from '../context/CarrinhoContext'

function ProdutoCard({ produto, onVerDetalhes }) {
  const { adicionarAoCarrinho } = useCarrinho()

  return (
    <div className="produto">
      {produto.imagem_url && (
        <img
          src={produto.imagem_url}
          alt={produto.nome}
          className="produto-imagem"
        />
      )}

      <h3>{produto.nome}</h3>

      <p>{produto.descricao}</p>

      <strong>
        R$ {Number(produto.preco).toFixed(2)}
      </strong>

      <div className="produto-acoes">
        <button
          type="button"
          onClick={() => onVerDetalhes(produto)}
        >
          Ver detalhes
        </button>

        <button
          type="button"
          onClick={() => {
            console.log('CLIQUEI NO BOTÃO')
            adicionarAoCarrinho(produto)
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProdutoCard