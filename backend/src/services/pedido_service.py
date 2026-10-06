from decimal import Decimal

from sqlalchemy.orm import Session

from src.models.item_pedido import ItemPedido
from src.models.pedido import Pedido
from src.models.produto import Produto
from src.repositories.pedido_repository import PedidoRepository
from src.schemas.item_pedido import ItemPedidoCreate
from src.schemas.pedido import PedidoCreate


class PedidoService:

    @staticmethod
    def criar_pedido(
        db: Session,
        dados: PedidoCreate,
        itens: list[ItemPedidoCreate]
    ):
        if not itens:
            raise ValueError("Não é possível criar um pedido sem itens.")

        valor_total = Decimal("0.00")
        itens_pedido = []

        for item in itens:
            if item.quantidade <= 0:
                raise ValueError(
                    "A quantidade do item deve ser maior que zero."
                )

            produto = (
                db.query(Produto)
                .filter(
                    Produto.id_produto == item.id_produto,
                    Produto.ativo == True
                )
                .first()
            )

            if not produto:
                raise ValueError(
                    f"Produto {item.id_produto} não encontrado ou está inativo."
                )

            preco_unitario = produto.preco
            subtotal = preco_unitario * item.quantidade

            valor_total += subtotal

            itens_pedido.append(
                ItemPedido(
                    id_produto=produto.id_produto,
                    quantidade=item.quantidade,
                    preco_unitario=preco_unitario,
                    subtotal=subtotal
                )
            )

        pedido = Pedido(
            id_usuario=dados.id_usuario,
            valor_total=valor_total,
            status="RECEBIDO"
        )

        db.add(pedido)
        db.flush()

        for item_pedido in itens_pedido:
            item_pedido.id_pedido = pedido.id_pedido
            db.add(item_pedido)

        db.commit()
        db.refresh(pedido)

        return pedido

    @staticmethod
    def buscar_pedido(db: Session, id_pedido: int):
        pedido = PedidoRepository.buscar_por_id(db, id_pedido)

        if not pedido:
            raise ValueError("Pedido não encontrado.")

        return pedido

    @staticmethod
    def listar_pedidos_usuario(db: Session, id_usuario: int):
        return PedidoRepository.listar_por_usuario(db, id_usuario)

    @staticmethod
    def listar_todos(db: Session):
        return PedidoRepository.listar_todos(db)

    @staticmethod
    def atualizar_status(
        db: Session,
        id_pedido: int,
        novo_status: str
    ):
        status_validos = {
            "RECEBIDO",
            "EM_PREPARO",
            "SAIU_PARA_ENTREGA",
            "ENTREGUE",
            "CANCELADO"
        }

        if novo_status not in status_validos:
            raise ValueError("Status de pedido inválido.")

        pedido = PedidoRepository.buscar_por_id(db, id_pedido)

        if not pedido:
            raise ValueError("Pedido não encontrado.")

        pedido.status = novo_status

        return PedidoRepository.atualizar(db, pedido)
