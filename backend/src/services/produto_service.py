from sqlalchemy.orm import Session

from src.models.produto import Produto
from src.repositories.produto_repository import ProdutoRepository
from src.schemas.produto import ProdutoCreate


class ProdutoService:

    @staticmethod
    def listar_catalogo(db: Session):
        return ProdutoRepository.listar_ativos(db)

    @staticmethod
    def buscar_produto(db: Session, id_produto: int):
        produto = ProdutoRepository.buscar_por_id(db, id_produto)

        if not produto:
            raise ValueError("Produto não encontrado.")

        return produto

    @staticmethod
    def listar_todos(db: Session):
        return ProdutoRepository.listar_todos(db)

    @staticmethod
    def criar_produto(db: Session, dados: ProdutoCreate):
        produto = Produto(
            nome=dados.nome,
            descricao=dados.descricao,
            preco=dados.preco,
            imagem_url=dados.imagem_url,
            ativo=dados.ativo
        )

        return ProdutoRepository.criar(db, produto)

    @staticmethod
    def desativar_produto(db: Session, id_produto: int):
        produto = ProdutoRepository.buscar_por_id(db, id_produto)

        if not produto:
            raise ValueError("Produto não encontrado.")

        produto.ativo = False

        return ProdutoRepository.atualizar(db, produto)
