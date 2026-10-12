import { useEffect, useState } from 'react'
import { listarProdutos, criarPedido } from './services/api'
import { useCarrinho } from './context/CarrinhoContext'
import Catalogo from './components/Catalogo'
import ProdutoDetalhes from './components/ProdutoDetalhes'
import Carrinho from './components/Carrinho'
import EnderecoEntrega from './components/EnderecoEntrega'
import RevisaoPedido from './components/RevisaoPedido'
import Pagamento from './components/Pagamento'
import StatusPedido from './components/StatusPedido'
import PedidosAdmin from './components/PedidosAdmin'
import DetalhesPedidoAdmin from './components/DetalhesPedidoAdmin'
import CriarProduto from './components/CriarProduto'
import ProdutosAdmin from './components/ProdutosAdmin'
import './App.css'

function App() {
  const { itens } = useCarrinho()

  const [produtos, setProdutos] = useState([])
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [tela, setTela] = useState('catalogo')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [pagamento, setFormaPagamento] = useState(null)
  const [pedidoCriado, setPedidoCriado] = useState(null)
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null)
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null)

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await listarProdutos()
        setProdutos(dados)
      } catch (erro) {
        setErro('Não foi possível carregar os produtos.')
      } finally {
        setCarregando(false)
      }
    }

    carregarProdutos()
  }, [])

  function abrirDetalhes(produto) {
    setProdutoSelecionado(produto)
  }

  function voltarCatalogo() {
    setProdutoSelecionado(null)
    setTela('catalogo')
  }

  function continuarParaEntrega() {
    setTela('endereco')
  }

  async function confirmarPedido(formaPagamentoSelecionada) {
    try {
      const pedido = {
        id_usuario: 4,

        itens: itens.map((item) => ({
          id_produto: item.id_produto,
          quantidade: item.quantidade,
          preco_unitario: Number(item.preco),
          subtotal: Number(item.preco) * item.quantidade,
        })),

        endereco,

        pagamento: {
          forma_pagamento: formaPagamentoSelecionada,
        },
      }

      const resposta = await criarPedido(pedido)

      setPedidoCriado(resposta)
      setTela('confirmacao')
    } catch (erro) {
      setErro(erro.message)
    }
  }

  function abrirDetalhesPedido(idPedido) {
    setPedidoSelecionado(idPedido)
    setTela('detalhes-pedido-admin')
  }

  function voltarParaPedidosAdmin() {
    setPedidoSelecionado(null)
    setTela('pedidos-admin')
  }

  function abrirCriacaoProduto() {
    setTela('criar-produto')
  }

  function voltarParaAdministracao() {
    setTela('pedidos-admin')
  }

  function abrirGerenciamentoProdutos() {
    setTela('produtos-admin')
  }

  function abrirEdicaoProduto(produto) {
    setProdutoEmEdicao(produto)
    setTela('editar-produto')
  }

  function voltarParaProdutosAdmin() {
    setProdutoEmEdicao(null)
    setTela('produtos-admin')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="marca">
          <img
            src="/capybara.png"
            alt="Capivara confeiteira da Capycakes"
            className="marca-mascote"
          />

          <div>
            <h1>Capycakes</h1>
            <h3>Um cupcake, um carinho.</h3>
            <p>
              Escolha seu favorito. A gente cuida do resto.
            </p>
          </div>
        </div>

        <nav>
          <button
            type="button"
            onClick={() => {
              setTela('catalogo')
              setProdutoSelecionado(null)
            }}
          >
            Catálogo
          </button>

          <button
            type="button"
            onClick={() => {
              setTela('carrinho')
              setProdutoSelecionado(null)
            }}
          >
            🛒 Carrinho
          </button>
        </nav>

        <button
          type="button"
          onClick={() => {
            setTela('status')
            setProdutoSelecionado(null)
          }}
        >
          Consultar pedido
        </button>

        <button
          type="button"
          onClick={() => {
            setTela('pedidos-admin')
            setProdutoSelecionado(null)
          }}
        >
          Administração
        </button>
      </header>

      <main>
        {carregando && <p>Carregando produtos...</p>}

        {erro && <p>{erro}</p>}

        {!carregando && !erro && tela === 'carrinho' && (
          <Carrinho onContinuar={continuarParaEntrega} />
        )}

        {!carregando &&
          !erro &&
          tela === 'catalogo' &&
          produtoSelecionado && (
            <ProdutoDetalhes
              produto={produtoSelecionado}
              onVoltar={voltarCatalogo}
            />
          )}

        {!carregando &&
          !erro &&
          tela === 'catalogo' &&
          !produtoSelecionado && (
            <Catalogo
              produtos={produtos}
              onVerDetalhes={abrirDetalhes}
            />
          )}

        {!carregando &&
          !erro &&
          tela === 'endereco' && (
            <EnderecoEntrega
              onContinuar={(dadosEndereco) => {
                setEndereco(dadosEndereco)
                setTela('revisao')
              }}
            />
          )}

        {!carregando &&
          !erro &&
          tela === 'revisao' &&
          endereco && (
            <RevisaoPedido
              endereco={endereco}
              onVoltar={() => setTela('endereco')}
              onContinuar={() => setTela('pagamento')}
            />
          )}

        {!carregando &&
          !erro &&
          tela === 'pagamento' && (
            <Pagamento
              onVoltar={() => setTela('revisao')}
              onContinuar={(forma) => {
                setFormaPagamento(forma)
                confirmarPedido(forma)
              }}
            />
          )}

        {!carregando &&
          !erro &&
          tela === 'confirmacao' && (
            <section>
              <h2>Pedido confirmado!</h2>

              <p>
                Seu pedido foi registrado com sucesso.
              </p>

              {pedidoCriado && (
                <p>
                  Número do pedido: <strong>#{pedidoCriado.id_pedido}</strong>
                </p>
              )}
            </section>
          )}

          {!carregando &&
            !erro &&
            tela === 'status' && (
              <StatusPedido />
            )}

          {!carregando &&
            !erro &&
            tela === 'pedidos-admin' && (
              <PedidosAdmin
                onVerDetalhes={abrirDetalhesPedido}
                onGerenciarProdutos={abrirGerenciamentoProdutos}
              />
            )}

          {!carregando && !erro && tela === 'produtos-admin' && (
            <ProdutosAdmin
              onEditar={abrirEdicaoProduto}
              onCriarProduto={abrirCriacaoProduto}
              aoVoltar={voltarParaPedidosAdmin}
            />
          )}

          {!carregando &&
            !erro &&
            tela === 'detalhes-pedido-admin' &&
            pedidoSelecionado && (
              <DetalhesPedidoAdmin
                idPedido={pedidoSelecionado}
                onVoltar={voltarParaPedidosAdmin}
              />
            )}

          {!carregando && !erro &&
            (tela === 'criar-produto' || tela === 'editar-produto') && (
              <CriarProduto
                produtoParaEditar={
                  tela === 'editar-produto' ? produtoEmEdicao : null
                }
                onProdutoCriado={voltarParaProdutosAdmin}
                onProdutoAtualizado={voltarParaProdutosAdmin}
              />
          )}
      </main>
    </div>
  )
}

export default App