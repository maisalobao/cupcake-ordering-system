from sqlalchemy.orm import Session

from src.models.usuario import Usuario


class UsuarioRepository:

    @staticmethod
    def criar(db: Session, usuario: Usuario):
        db.add(usuario)
        db.commit()
        db.refresh(usuario)

        return usuario

    @staticmethod
    def buscar_por_id(db: Session, id_usuario: int):
        return (
            db.query(Usuario)
            .filter(Usuario.id_usuario == id_usuario)
            .first()
        )

    @staticmethod
    def buscar_por_email(db: Session, email: str):
        return (
            db.query(Usuario)
            .filter(Usuario.email == email)
            .first()
        )

    @staticmethod
    def listar_todos(db: Session):
        return db.query(Usuario).all()
