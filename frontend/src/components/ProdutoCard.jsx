
import { useState } from 'react'
import { useCarrinho } from '../context/CarrinhoContext'

function ProdutoCard({ produto, onVerDetalhes }) {
  const { adicionarAoCarrinho } = useCarrinho()
  const [adicionado, setAdicionado] = useState(false)

  function handleAdicionarAoCarrinho() {
    adicionarAoCarrinho(produto)
    setAdicionado(true)

    setTimeout(() => {
      setAdicionado(false)
    }, 2000)
  }

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
          onClick={handleAdicionarAoCarrinho}
          className={adicionado ? 'botao-adicionado' : ''}
        >
          {adicionado ? '✓ Adicionado!' : 'Adicionar ao carrinho'}
        </button>
      </div>

      {adicionado && (
        <p className="mensagem-adicionado" aria-live="polite">
          ✓ Produto adicionado ao carrinho!
        </p>
      )}
    </div>
  )
}

export default ProdutoCard
