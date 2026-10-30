import { useCarrinho } from '../context/CarrinhoContext'

function Carrinho({ onContinuar }) {
  const {
    itens,
    alterarQuantidade,
    removerDoCarrinho,
  } = useCarrinho()

  if (itens.length === 0) {
    return (
      <section className="carrinho">
        <h2>Seu carrinho 🛒</h2>
        <div className="carrinho-vazio">
          <span>🧁</span>
          <h3>Seu carrinho está vazio!</h3>
          <p>Que tal escolher alguns cupcakes deliciosos?</p>
        </div>
      </section>
    )
  }

  const total = itens.reduce(
    (soma, item) => soma + Number(item.preco) * item.quantidade,
    0
  )

  return (
    <section className="carrinho">
      <h2>Seu carrinho 🛒</h2>
      <p className="carrinho-subtitulo">
        Confira seus produtos antes de continuar.
      </p>

      <div className="lista-itens-carrinho">
        {itens.map((item) => (
          <div className="item-carrinho" key={item.id_produto}>
            {item.imagem_url && (
              <img
                src={item.imagem_url}
                alt={item.nome}
                className="item-carrinho-imagem"
              />
            )}

            <div className="item-carrinho-info">
              <h3>{item.nome}</h3>

              <p className="item-preco">
                R$ {Number(item.preco).toFixed(2)}
              </p>

              <div className="item-carrinho-acoes">
                <div className="controle-quantidade">
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${item.nome}`}
                    disabled={item.quantidade <= 1}
                    onClick={() =>
                      alterarQuantidade(
                        item.id_produto,
                        item.quantidade - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantidade}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${item.nome}`}
                    onClick={() =>
                      alterarQuantidade(
                        item.id_produto,
                        item.quantidade + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="botao-remover"
                  onClick={() => removerDoCarrinho(item.id_produto)}
                  aria-label={`Remover ${item.nome} do carrinho`}
                >
                  🗑 Remover
                </button>
              </div>
            </div>

            <strong className="item-subtotal">
              R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
            </strong>
          </div>
        ))}
      </div>

      <div className="resumo-carrinho">
        <div className="resumo-total">
          <span>Total do pedido</span>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>

        <button
          type="button"
          className="botao-continuar-entrega"
          onClick={onContinuar}
        >
          Seguir para entrega →
        </button>
      </div>
    </section>
  )
}

export default Carrinho
