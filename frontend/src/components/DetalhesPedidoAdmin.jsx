
import { useEffect, useState } from 'react'
import {
  buscarDetalhesPedido,
  atualizarStatusPedido,
  atualizarStatusPagamento,
} from '../services/api'

function DetalhesPedidoAdmin({ idPedido, onVoltar }) {
  const [pedido, setPedido] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [novoStatus, setNovoStatus] = useState('')
  const [atualizandoStatus, setAtualizandoStatus] = useState(false)
  const [mensagemStatus, setMensagemStatus] = useState('')
  const [atualizandoPagamento, setAtualizandoPagamento] = useState(false)
  const [mensagemPagamento, setMensagemPagamento] = useState('')

  async function atualizarStatus() {
    if (!novoStatus) return

    setAtualizandoStatus(true)
    setMensagemStatus('')

    try {
      const pedidoAtualizado = await atualizarStatusPedido(
        idPedido,
        novoStatus
      )

      setPedido((pedidoAtual) => ({
        ...pedidoAtual,
        status: pedidoAtualizado.status,
      }))

      setMensagemStatus('Status do pedido atualizado com sucesso.')
      setNovoStatus('')
    } catch (erro) {
      setMensagemStatus(erro.message)
    } finally {
      setAtualizandoStatus(false)
    }
  }

  async function atualizarPagamento(novoStatusPagamento) {
    const acao = novoStatusPagamento === 'APROVADO'
      ? 'aprovar'
      : 'cancelar'

    const confirmado = window.confirm(
      `Deseja realmente ${acao} o pagamento deste pedido?`
    )

    if (!confirmado) return

    setAtualizandoPagamento(true)
    setMensagemPagamento('')

    try {
      const pagamentoAtualizado = await atualizarStatusPagamento(
        idPedido,
        novoStatusPagamento
      )

      setPedido((pedidoAtual) => ({
        ...pedidoAtual,
        pagamento: {
          ...pedidoAtual.pagamento,
          status: pagamentoAtualizado.status,
        },
      }))

      setMensagemPagamento(
        novoStatusPagamento === 'APROVADO'
          ? 'Pagamento aprovado com sucesso.'
          : 'Pagamento cancelado com sucesso.'
      )
    } catch (erro) {
      setMensagemPagamento(erro.message)
    } finally {
      setAtualizandoPagamento(false)
    }
  }

  useEffect(() => {
    async function carregarDetalhes() {
      setCarregando(true)
      setErro('')

      try {
        const dados = await buscarDetalhesPedido(idPedido)
        setPedido(dados)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarDetalhes()
  }, [idPedido])

  if (carregando) {
    return <p>Carregando detalhes do pedido...</p>
  }

  if (erro) {
    return (
      <section>
        <p>{erro}</p>
        <button type="button" onClick={onVoltar}>
          ← Voltar
        </button>
      </section>
    )
  }

  return (
    <section className="detalhes-pedido-admin">
      <button type="button" onClick={onVoltar}>
        ← Voltar para pedidos
      </button>

      <h2>Pedido #{pedido.id_pedido}</h2>

      <p>Cliente: #{pedido.id_usuario}</p>

      <p>
        Status: <strong>{pedido.status}</strong>
      </p>

      <div className="atualizacao-status">
        <label>
          Novo status
          <select
            value={novoStatus}
            onChange={(event) => setNovoStatus(event.target.value)}
          >
            <option value="">Selecione um status</option>
            <option value="RECEBIDO">Recebido</option>
            <option value="EM_PREPARO">Em preparo</option>
            <option value="SAIU_PARA_ENTREGA">Saiu para entrega</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </label>

        <button
          type="button"
          onClick={atualizarStatus}
          disabled={!novoStatus || atualizandoStatus}
        >
          {atualizandoStatus ? 'Atualizando...' : 'Atualizar status'}
        </button>

        {mensagemStatus && <p>{mensagemStatus}</p>}
      </div>

      <h3>Produtos</h3>

      {pedido.itens.map((item) => (
        <div className="item-detalhe-pedido" key={item.id_produto}>
          <h4>{item.nome_produto}</h4>
          <p>Quantidade: {item.quantidade}</p>
          <p>
            Preço unitário: R${' '}
            {Number(item.preco_unitario).toFixed(2)}
          </p>
          <p>
            Subtotal: R${' '}
            {Number(item.subtotal).toFixed(2)}
          </p>
        </div>
      ))}

      <h3>
        Total: R${' '}
        {Number(pedido.valor_total).toFixed(2)}
      </h3>

      <h3>Endereço de entrega</h3>

      <p>
        {pedido.endereco.logradouro}, {pedido.endereco.numero}
      </p>

      {pedido.endereco.complemento && (
        <p>{pedido.endereco.complemento}</p>
      )}

      <p>
        {pedido.endereco.bairro} - {pedido.endereco.cidade}/
        {pedido.endereco.estado}
      </p>

      <p>CEP: {pedido.endereco.cep}</p>

      <h3>Pagamento</h3>

      <p>
        Forma: {pedido.pagamento.forma_pagamento}
      </p>

      <p>
        Status: <strong>{pedido.pagamento.status}</strong>
      </p>

      {pedido.pagamento.status === 'PENDENTE' && (
        <div className="atualizacao-pagamento">
          <button
            type="button"
            onClick={() => atualizarPagamento('APROVADO')}
            disabled={atualizandoPagamento}
          >
            {atualizandoPagamento
              ? 'Processando...'
              : 'Aprovar pagamento'}
          </button>

          <button
            type="button"
            onClick={() => atualizarPagamento('CANCELADO')}
            disabled={atualizandoPagamento}
          >
            {atualizandoPagamento
              ? 'Processando...'
              : 'Cancelar pagamento'}
          </button>
        </div>
      )}

      {mensagemPagamento && <p>{mensagemPagamento}</p>}
    </section>
  )
}

export default DetalhesPedidoAdmin
