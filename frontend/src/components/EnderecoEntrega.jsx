import { useState } from 'react'

function EnderecoEntrega({ onContinuar }) {
  const [endereco, setEndereco] = useState({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  })

  function alterarCampo(event) {
    const { name, value } = event.target

    setEndereco((enderecoAtual) => ({
      ...enderecoAtual,
      [name]: value,
    }))
  }

  function enviarFormulario(event) {
    event.preventDefault()

    onContinuar(endereco)
  }

  return (
    <section className="endereco-entrega">
      <h2>Dados de entrega</h2>

      <form onSubmit={enviarFormulario}>
        <label>
          Logradouro
          <input
            type="text"
            name="logradouro"
            value={endereco.logradouro}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Número
          <input
            type="text"
            name="numero"
            value={endereco.numero}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Complemento
          <input
            type="text"
            name="complemento"
            value={endereco.complemento}
            onChange={alterarCampo}
          />
        </label>

        <label>
          Bairro
          <input
            type="text"
            name="bairro"
            value={endereco.bairro}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Cidade
          <input
            type="text"
            name="cidade"
            value={endereco.cidade}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Estado
          <input
            type="text"
            name="estado"
            value={endereco.estado}
            onChange={alterarCampo}
            maxLength={2}
            required
          />
        </label>

        <label>
          CEP
          <input
            type="text"
            name="cep"
            value={endereco.cep}
            onChange={alterarCampo}
            required
          />
        </label>

        <button type="submit">
          Continuar
        </button>
      </form>
    </section>
  )
}

export default EnderecoEntrega