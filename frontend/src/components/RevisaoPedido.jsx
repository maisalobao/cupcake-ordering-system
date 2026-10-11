import { useCarrinho } from '../context/CarrinhoContext'

function RevisaoPedido({ endereco, onVoltar, onContinuar }) {
  const { itens } = useCarrinho()

  const total = itens.reduce(
    (soma, item) =>
      soma + Number(item.preco) * item.quantidade,
    0
  )

  return (
    <section className="revisao-pedido">
      <h2>Revisar pedido</h2>

      <h3>Produtos</h3>

      {itens.map((item) => (
        <div
          className="item-revisao"
          key={item.id_produto}
        >
          <h4>{item.nome}</h4>

          <p>
            {item.quantidade} × R${' '}
            {Number(item.preco).toFixed(2)}
          </p>

          <strong>
            Subtotal: R${' '}
            {(
              Number(item.preco) * item.quantidade
            ).toFixed(2)}
          </strong>
        </div>
      ))}

      <h3>
        Total: R$ {total.toFixed(2)}
      </h3>

      <h3>Endereço de entrega</h3>

      <p>
        {endereco.logradouro}, {endereco.numero}
      </p>

      {endereco.complemento && (
        <p>{endereco.complemento}</p>
      )}

      <p>
        {endereco.bairro} - {endereco.cidade}/{endereco.estado}
      </p>

      <p>CEP: {endereco.cep}</p>

      <div>
        <button
          type="button"
          onClick={onVoltar}
        >
          ← Voltar
        </button>

        <button
          type="button"
          onClick={onContinuar}
        >
          Continuar para pagamento
        </button>
      </div>
    </section>
  )
}

export default RevisaoPedido