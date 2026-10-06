from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.schemas.usuario import UsuarioCreate, UsuarioResponse
from src.services.usuario_service import UsuarioService


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
