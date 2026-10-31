
import { useState } from 'react'
import { loginAdmin } from '../services/api'

function LoginAdmin({ onLogin, onVoltar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar(event) {
    event.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const dados = await loginAdmin(email, senha)
      onLogin(dados.usuario)
    } catch (erro) {
      setErro(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <section className="login-admin">
      <h2>Área administrativa</h2>
      <p>Entre com suas credenciais para continuar.</p>

      <form onSubmit={entrar}>
        <label htmlFor="email-admin">E-mail</label>
        <input
          id="email-admin"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Digite seu e-mail"
          required
        />

        <label htmlFor="senha-admin">Senha</label>
        <input
          id="senha-admin"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          placeholder="Digite sua senha"
          required
        />

        {erro && <p className="erro-login">{erro}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <button
        type="button"
        className="botao-voltar-login"
        onClick={onVoltar}
      >
        Voltar ao catálogo
      </button>
    </section>
  )
}

export default LoginAdmin
