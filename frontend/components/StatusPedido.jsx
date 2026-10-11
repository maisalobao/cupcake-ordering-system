import { useState } from 'react'
import { buscarPedido } from '../services/api'

function StatusPedido() {
  const [idPedido, setIdPedido] = useState('')
  const [pedido, setPedido] = useState(null)
  const [erro, setErro] = useState('')

  async function consultarPedido(event) {
    event.preventDefault()

    setErro('')
    setPedido(null)

    try {
      const dados = await buscarPedido(idPedido)
      setPedido(dados)
    } catch (erro) {
      setErro(erro.message)
    }
  }

  return (
    <section className="status-pedido">
      <h2>Consultar pedido</h2>

      <form onSubmit={consultarPedido}>
        <label>
          Número do pedido
          <input
            type="number"
            value={idPedido}
            onChange={(event) => setIdPedido(event.target.value)}
            required
          />
        </label>

        <button type="submit">
          Consultar
        </button>
      </form>

      {erro && <p>{erro}</p>}

      {pedido && (
        <div>
          <h3>Pedido #{pedido.id_pedido}</h3>

          <p>
            Valor total: R${' '}
            {Number(pedido.valor_total).toFixed(2)}
          </p>

          <p>
            Status: <strong>{pedido.status}</strong>
          </p>
        </div>
      )}
    </section>
  )
}

export default StatusPedido