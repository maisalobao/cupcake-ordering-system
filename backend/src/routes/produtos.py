from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.schemas.produto import ProdutoCreate, ProdutoResponse
from src.services.produto_service import ProdutoService


router = APIRouter(
    prefix="/produtos",
    tags=["Produtos"]
)


@router.get("/", response_model=list[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):
    return ProdutoService.listar_catalogo(db)


@router.get("/{id_produto}", response_model=ProdutoResponse)
def buscar_produto(
    id_produto: int,
    db: Session = Depends(get_db)
):
    try:
        return ProdutoService.buscar_produto(db, id_produto)
    except ValueError as erro:
        raise HTTPException(
            status_code=404,
            detail=str(erro)
        )


@router.post("/", response_model=ProdutoResponse, status_code=201)
def criar_produto(
    dados: ProdutoCreate,
    db: Session = Depends(get_db)
):
    return ProdutoService.criar_produto(db, dados)


@router.get("/admin/todos", response_model=list[ProdutoResponse])
def listar_todos_produtos(db: Session = Depends(get_db)):
    return ProdutoService.listar_todos(db)


@router.patch("/{id_produto}/desativar", response_model=ProdutoResponse)
def desativar_produto(
    id_produto: int,
    db: Session = Depends(get_db)
):
    try:
        return ProdutoService.desativar_produto(db, id_produto)
    except ValueError as erro:
        raise HTTPException(
            status_code=404,
            detail=str(erro)
        )
