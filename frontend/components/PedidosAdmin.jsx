import { useEffect, useState } from 'react'
import { listarTodosPedidos } from '../services/api'

function PedidosAdmin({ onVerDetalhes, onGerenciarProdutos }) {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const dados = await listarTodosPedidos()
        setPedidos(dados)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarPedidos()
  }, [])

  if (carregando) {
    return <p>Carregando pedidos...</p>
  }

  if (erro) {
    return <p>{erro}</p>
  }

  return (
    <section className="pedidos-admin">
      <h2>Pedidos</h2>

      <button type="button" onClick={onGerenciarProdutos}>
        Gerenciar produtos
      </button>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div>
          {pedidos.map((pedido) => (
            <div
              className="pedido-admin"
              key={pedido.id_pedido}
            >
              <h3>
                Pedido #{pedido.id_pedido}
              </h3>

              <p>
                Cliente: #{pedido.id_usuario}
              </p>

              <p>
                Total: R${' '}
                {Number(pedido.valor_total).toFixed(2)}
              </p>

              <p>
                Status:{' '}
                <strong>{pedido.status}</strong>
              </p>

              <button
                type="button"
                onClick={() => onVerDetalhes(pedido.id_pedido)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default PedidosAdmin