import { useState } from 'react'

function Pagamento({ onVoltar, onContinuar }) {
  const [formaPagamento, setFormaPagamento] = useState('')

  function selecionarPagamento(event) {
    setFormaPagamento(event.target.value)
  }

  function continuar(event) {
    event.preventDefault()

    if (!formaPagamento) {
      return
    }

    onContinuar(formaPagamento)
  }

  return (
    <section className="pagamento">
      <h2>Forma de pagamento</h2>

      <form onSubmit={continuar}>
        <label>
          <input
            type="radio"
            name="formaPagamento"
            value="PIX"
            checked={formaPagamento === 'PIX'}
            onChange={selecionarPagamento}
          />
          PIX
        </label>

        <label>
          <input
            type="radio"
            name="formaPagamento"
            value="CARTAO"
            checked={formaPagamento === 'CARTAO'}
            onChange={selecionarPagamento}
          />
          Cartão
        </label>

        <label>
          <input
            type="radio"
            name="formaPagamento"
            value="DINHEIRO"
            checked={formaPagamento === 'DINHEIRO'}
            onChange={selecionarPagamento}
          />
          Dinheiro
        </label>

        <div>
          <button
            type="button"
            onClick={onVoltar}
          >
            ← Voltar
          </button>

          <button type="submit">
            Continuar
          </button>
        </div>
      </form>
    </section>
  )
}

export default Pagamento