from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.schemas.item_pedido import ItemPedidoCreate
from src.schemas.pedido import PedidoCreateCompleto, PedidoResponse
from src.services.pedido_service import PedidoService


router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)


@router.post("/", response_model=PedidoResponse, status_code=201)
def criar_pedido(
    dados: PedidoCreateCompleto,
    db: Session = Depends(get_db)
):
    try:
        return PedidoService.criar_pedido(
            db,
            dados
        )
    except ValueError as erro:
        raise HTTPException(
            status_code=400,
            detail=str(erro)
        )


@router.get("/{id_pedido}", response_model=PedidoResponse)
def buscar_pedido(
    id_pedido: int,
    db: Session = Depends(get_db)
):
    try:
        return PedidoService.buscar_pedido(
            db,
            id_pedido
        )
    except ValueError as erro:
        raise HTTPException(
            status_code=404,
            detail=str(erro)
        )


@router.get("/usuario/{id_usuario}", response_model=list[PedidoResponse])
def listar_pedidos_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    return PedidoService.listar_pedidos_usuario(
        db,
        id_usuario
    )


@router.get("/admin/todos", response_model=list[PedidoResponse])
def listar_todos_pedidos(
    db: Session = Depends(get_db)
):
    return PedidoService.listar_todos(db)


@router.patch("/{id_pedido}/status", response_model=PedidoResponse)
def atualizar_status(
    id_pedido: int,
    novo_status: str,
    db: Session = Depends(get_db)
):
    try:
        return PedidoService.atualizar_status(
            db,
            id_pedido,
            novo_status
        )
    except ValueError as erro:
        raise HTTPException(
            status_code=400,
            detail=str(erro)
        )
