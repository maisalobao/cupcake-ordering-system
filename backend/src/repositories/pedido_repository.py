from sqlalchemy.orm import Session

from src.models.pedido import Pedido
from src.models.item_pedido import ItemPedido
from src.models.produto import Produto
from src.models.endereco_entrega import EnderecoEntrega
from src.models.pagamento import Pagamento


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
    def buscar_detalhes(db: Session, id_pedido: int):
        pedido = (
            db.query(Pedido)
            .filter(Pedido.id_pedido == id_pedido)
            .first()
        )

        if not pedido:
            return None

        itens = (
            db.query(ItemPedido, Produto)
            .join(
                Produto,
                ItemPedido.id_produto == Produto.id_produto
            )
            .filter(ItemPedido.id_pedido == id_pedido)
            .all()
        )

        endereco = (
            db.query(EnderecoEntrega)
            .filter(
                EnderecoEntrega.id_pedido == id_pedido
            )
            .first()
        )

        pagamento = (
            db.query(Pagamento)
            .filter(
                Pagamento.id_pedido == id_pedido
            )
            .first()
        )

        return {
            "pedido": pedido,
            "itens": itens,
            "endereco": endereco,
            "pagamento": pagamento
        }

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
