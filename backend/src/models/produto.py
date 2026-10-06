from sqlalchemy import Boolean, DateTime, DECIMAL, Integer, String, Text, text
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base


class Produto(Base):
    __tablename__ = "produto"

    id_produto: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nome: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    descricao: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    preco: Mapped[float] = mapped_column(
        DECIMAL(10, 2),
        nullable=False
    )

    imagem_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    ativo: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True
    )

    criado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    atualizado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        server_onupdate=text("CURRENT_TIMESTAMP")
    )
