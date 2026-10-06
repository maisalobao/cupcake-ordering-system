from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base


class EnderecoEntrega(Base):
    __tablename__ = "endereco_entrega"

    id_endereco: Mapped[int] = mapped_column(
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

    logradouro: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    numero: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    complemento: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    bairro: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    cidade: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    estado: Mapped[str] = mapped_column(
        String(2),
        nullable=False
    )

    cep: Mapped[str] = mapped_column(
        String(9),
        nullable=False
    )
