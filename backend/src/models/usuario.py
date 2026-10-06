from sqlalchemy import DateTime, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base


class Usuario(Base):
    __tablename__ = "usuario"

    id_usuario: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nome: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        unique=True
    )

    senha: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    tipo: Mapped[str] = mapped_column(
        Enum("CLIENTE", "ADMINISTRADOR"),
        nullable=False,
        default="CLIENTE"
    )

    criado_em: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False
    )
