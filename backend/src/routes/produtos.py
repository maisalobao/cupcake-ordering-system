
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.security import obter_admin_atual
from src.schemas.produto import ProdutoCreate, ProdutoResponse, ProdutoUpdate
from src.services.produto_service import ProdutoService


router = APIRouter(
    prefix="/produtos",
    tags=["Produtos"]
)


# Rota pública: catálogo de produtos ativos
@router.get("/", response_model=list[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):
    return ProdutoService.listar_catalogo(db)


# Rota administrativa: listar todos os produtos
@router.get("/admin/todos", response_model=list[ProdutoResponse])
def listar_todos_produtos(
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    return ProdutoService.listar_todos(db)


# Rota pública: consultar um produto
@router.get("/{id_produto}", response_model=ProdutoResponse)
def buscar_produto(id_produto: int, db: Session = Depends(get_db)):
    try:
        return ProdutoService.buscar_produto(db, id_produto)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro))


# Rota administrativa: criar produto
@router.post("/", response_model=ProdutoResponse, status_code=201)
def criar_produto(
    dados: ProdutoCreate,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    return ProdutoService.criar_produto(db, dados)


# Rota administrativa: editar produto
@router.put("/{id_produto}", response_model=ProdutoResponse)
def editar_produto(
    id_produto: int,
    dados: ProdutoUpdate,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    try:
        return ProdutoService.editar_produto(db, id_produto, dados)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro))


# Rota administrativa: desativar produto
@router.patch("/{id_produto}/desativar", response_model=ProdutoResponse)
def desativar_produto(
    id_produto: int,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    try:
        return ProdutoService.desativar_produto(db, id_produto)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro))
