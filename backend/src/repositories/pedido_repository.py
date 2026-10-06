from sqlalchemy.orm import Session

from src.models.pedido import Pedido


class PedidoRepository:

    @staticmethod
    def criar(db: Session, pedido: Pedido):
        db.add(pedido)
        db.commit()
        db.refresh(pedido)

        return pedido

    @staticmethod
    def buscar_por_id(db: Session, id_pedido: int):
        return (
            db.query(Pedido)
            .filter(Pedido.id_pedido == id_pedido)
            .first()
        )

    @staticmethod
    def listar_por_usuario(db: Session, id_usuario: int):
        return (
            db.query(Pedido)
            .filter(Pedido.id_usuario == id_usuario)
            .all()
        )

    @staticmethod
    def listar_todos(db: Session):
        return db.query(Pedido).all()

    @staticmethod
    def atualizar(db: Session, pedido: Pedido):
        db.commit()
        db.refresh(pedido)

        return pedido
