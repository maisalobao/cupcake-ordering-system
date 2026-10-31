
import { useState } from 'react'

function EnderecoEntrega({ onContinuar }) {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
  })

  const [endereco, setEndereco] = useState({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  })

  function alterarCliente(event) {
    const { name, value } = event.target

    setCliente((clienteAtual) => ({
      ...clienteAtual,
      [name]: value,
    }))
  }

  function alterarCampo(event) {
    const { name, value } = event.target
    let valorFormatado = value

    if (name === 'cep') {
      const numeros = value.replace(/\D/g, '').slice(0, 8)
      valorFormatado = numeros.replace(/^(\d{5})(\d)/, '$1-$2')
    }

    if (name === 'estado') {
      valorFormatado = value
        .replace(/[^a-zA-Z]/g, '')
        .slice(0, 2)
        .toUpperCase()
    }

    setEndereco((enderecoAtual) => ({
      ...enderecoAtual,
      [name]: valorFormatado,
    }))
  }

  function enviarFormulario(event) {
    event.preventDefault()

    onContinuar({
      cliente: {
        nome: cliente.nome.trim(),
        email: cliente.email.trim().toLowerCase(),
      },
      endereco,
    })
  }

  return (
    <section className="endereco-entrega">
      <div className="entrega-cabecalho">
        <h2>Seus dados</h2>
        <p>Informe seus dados para identificarmos seu pedido.</p>
      </div>

      <form onSubmit={enviarFormulario}>
        <div className="formulario-entrega">
          <label className="campo-logradouro">
            Nome completo
            <input
              type="text"
              name="nome"
              value={cliente.nome}
              onChange={alterarCliente}
              placeholder="Seu nome"
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>

          <label className="campo-logradouro">
            E-mail
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={alterarCliente}
              placeholder="seu@email.com"
              autoComplete="email"
              maxLength={150}
              required
            />
          </label>
        </div>

        <div className="entrega-cabecalho">
          <h2>Dados de entrega 📍</h2>
          <p>Informe o endereço onde seu pedido deverá ser entregue.</p>
        </div>

        <div className="formulario-entrega">
          <label className="campo-logradouro">
            Endereço
            <input
              type="text"
              name="logradouro"
              value={endereco.logradouro}
              onChange={alterarCampo}
              placeholder="Rua, avenida..."
              autoComplete="street-address"
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
              placeholder="Ex.: 123"
              required
            />
          </label>

          <label>
            Complemento <span className="campo-opcional">(opcional)</span>
            <input
              type="text"
              name="complemento"
              value={endereco.complemento}
              onChange={alterarCampo}
              placeholder="Apartamento, bloco, casa..."
            />
          </label>

          <label>
            Bairro
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={alterarCampo}
              placeholder="Seu bairro"
              autoComplete="address-level3"
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
              placeholder="Sua cidade"
              autoComplete="address-level2"
              required
            />
          </label>

          <label>
            Estado (UF)
            <input
              type="text"
              name="estado"
              value={endereco.estado}
              onChange={alterarCampo}
              placeholder="Ex.: PB"
              maxLength={2}
              autoComplete="address-level1"
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
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              pattern="[0-9]{5}-?[0-9]{3}"
              title="Informe um CEP válido com 8 números."
              required
            />
          </label>
        </div>

        <div className="entrega-acoes">
          <button type="submit" className="botao-continuar-entrega">
            Continuar para revisão →
          </button>
        </div>
      </form>
    </section>
  )
}

export default EnderecoEntrega
