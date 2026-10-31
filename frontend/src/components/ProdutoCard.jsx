
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
        <button
          type="button"
          className="produto-imagem-botao"
          onClick={() => onVerDetalhes(produto)}
          aria-label={`Ver detalhes de ${produto.nome}`}
        >
          <img
            src={produto.imagem_url}
            alt={produto.nome}
            className="produto-imagem"
          />
        </button>
      )}

      <h3>{produto.nome}</h3>

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
