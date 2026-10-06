from sqlalchemy import DateTime, Enum, ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base


class Pedido(Base):
    __tablename__ = "pedido"

    id_pedido: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    id_usuario: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        nullable=False
    )

    valor_total: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        Enum(
            "RECEBIDO",
            "EM_PREPARO",
            "SAIU_PARA_ENTREGA",
            "ENTREGUE",
            "CANCELADO"
        ),
        nullable=False,
        default="RECEBIDO"
    )

    criado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False
    )

    atualizado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False
    )
