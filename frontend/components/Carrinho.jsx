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
        <h2>Seu carrinho</h2>
        <p>Seu carrinho está vazio.</p>
      </section>
    )
  }

  const total = itens.reduce(
    (soma, item) =>
      soma + Number(item.preco) * item.quantidade,
    0
  )

  return (
    <section className="carrinho">
      <h2>Seu carrinho</h2>

      {itens.map((item) => (
        <div className="item-carrinho" key={item.id_produto}>
          <h3>{item.nome}</h3>

          <p>
            Preço unitário: R$ {Number(item.preco).toFixed(2)}
          </p>

          <p>
            Subtotal: R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
          </p>

          <div>
            <button
              type="button"
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
            onClick={() => removerDoCarrinho(item.id_produto)}
          >
            Remover
          </button>
        </div>
      ))}

      <div className="carrinho-total">
        <h3>
          Total: R$ {total.toFixed(2)}
        </h3>
      </div>

      <button
        type="button"
        onClick={() => onContinuar()}
      >
        Continuar para entrega
      </button>
    </section>
  )
}

export default Carrinho