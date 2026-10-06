from sqlalchemy.orm import Session

from src.models.produto import Produto


class ProdutoRepository:

    @staticmethod
    def listar_ativos(db: Session):
        return (
            db.query(Produto)
            .filter(Produto.ativo == True)
            .all()
        )

    @staticmethod
    def buscar_por_id(db: Session, id_produto: int):
        return (
            db.query(Produto)
            .filter(Produto.id_produto == id_produto)
            .first()
        )

    @staticmethod
    def listar_todos(db: Session):
        return db.query(Produto).all()

    @staticmethod
    def criar(db: Session, produto: Produto):
        db.add(produto)
        db.commit()
        db.refresh(produto)

        return produto

    @staticmethod
    def atualizar(db: Session, produto: Produto):
        db.commit()
        db.refresh(produto)

        return produto
