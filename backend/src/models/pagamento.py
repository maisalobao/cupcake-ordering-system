from sqlalchemy import DateTime, Enum, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base


class Pagamento(Base):
    __tablename__ = "pagamento"

    id_pagamento: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    id_pedido: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("pedido.id_pedido"),
        nullable=False,
        unique=True
    )

    forma_pagamento: Mapped[str] = mapped_column(
        Enum("PIX", "CARTAO", "DINHEIRO"),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        Enum("PENDENTE", "APROVADO", "CANCELADO"),
        nullable=False,
        default="PENDENTE"
    )

    criado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False
    )

    atualizado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False
    )
