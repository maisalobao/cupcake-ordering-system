from sqlalchemy.orm import Session

from src.models.usuario import Usuario
from src.repositories.usuario_repository import UsuarioRepository
from src.schemas.usuario import UsuarioCreate


class UsuarioService:

    @staticmethod
    def criar_usuario(db: Session, dados: UsuarioCreate):
        usuario_existente = UsuarioRepository.buscar_por_email(
            db,
            dados.email
        )

        if usuario_existente:
            raise ValueError("Já existe um usuário com este e-mail.")

        usuario = Usuario(
            nome=dados.nome,
            email=dados.email,
            senha=dados.senha,
            tipo="CLIENTE"
        )

        return UsuarioRepository.criar(db, usuario)

    @staticmethod
    def buscar_usuario(db: Session, id_usuario: int):
        usuario = UsuarioRepository.buscar_por_id(db, id_usuario)

        if not usuario:
            raise ValueError("Usuário não encontrado.")

        return usuario

    @staticmethod
    def buscar_por_email(db: Session, email: str):
        return UsuarioRepository.buscar_por_email(db, email)

    @staticmethod
    def listar_usuarios(db: Session):
        return UsuarioRepository.listar_todos(db)
