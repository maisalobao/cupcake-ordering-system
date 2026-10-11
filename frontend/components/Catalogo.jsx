import ProdutoCard from './ProdutoCard'

function Catalogo({ produtos, onVerDetalhes }) {
  return (
    <section className="catalogo">
      <h2>Nosso catálogo</h2>

      <div className="produtos">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id_produto}
            produto={produto}
            onVerDetalhes={onVerDetalhes}
          />
        ))}
      </div>
    </section>
  )
}

export default Catalogo