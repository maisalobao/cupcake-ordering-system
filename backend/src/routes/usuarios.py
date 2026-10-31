import bcrypt

from sqlalchemy import func
from src.schemas.usuario import LoginRequest
from src.security import criar_token_acesso
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.schemas.usuario import UsuarioCreate, UsuarioResponse
from src.services.usuario_service import UsuarioService
from src.models.usuario import Usuario


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)


@router.post("/", response_model=UsuarioResponse, status_code=201)
def criar_usuario(
    dados: UsuarioCreate,
    db: Session = Depends(get_db)
):
    try:
        return UsuarioService.criar_usuario(db, dados)
    except ValueError as erro:
        raise HTTPException(
            status_code=400,
            detail=str(erro)
        )

@router.post("/login")
def login(dados: LoginRequest, db: Session = Depends(get_db)):
    email = dados.email.strip().lower()

    usuario = db.query(Usuario).filter(
        func.lower(Usuario.email) == email
    ).first()

    if not usuario or usuario.tipo != "ADMINISTRADOR":
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha inválidos."
        )

    try:
        senha_valida = bcrypt.checkpw(
            dados.senha.encode("utf-8"),
            usuario.senha.encode("utf-8")
        )
    except (ValueError, AttributeError):
        senha_valida = False

    if not senha_valida:
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha inválidos."
        )

    token = criar_token_acesso(usuario)

    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id_usuario": usuario.id_usuario,
            "nome": usuario.nome,
            "email": usuario.email,
            "tipo": usuario.tipo
        }
    }

@router.get("/{id_usuario}", response_model=UsuarioResponse)
def buscar_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    try:
        return UsuarioService.buscar_usuario(db, id_usuario)
    except ValueError as erro:
        raise HTTPException(
            status_code=404,
            detail=str(erro)
        )
