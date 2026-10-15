import { createContext, useContext, useState } from 'react'

const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])

  function adicionarAoCarrinho(produto) {
    console.log('Produto adicionado:', produto)

    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.id_produto === produto.id_produto
      )

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.id_produto === produto.id_produto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [
        ...itensAtuais,
        {
          ...produto,
          quantidade: 1,
        },
      ]
    })
  }

  function alterarQuantidade(idProduto, novaQuantidade) {
    if (novaQuantidade <= 0) {
      return
    }

    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id_produto === idProduto
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    )
  }

  function removerDoCarrinho(idProduto) {
    setItens((itensAtuais) =>
      itensAtuais.filter(
        (item) => item.id_produto !== idProduto
      )
    )
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}

