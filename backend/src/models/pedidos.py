
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.security import obter_admin_atual
from src.config.database import get_db
from src.schemas.pedido import PedidoCreateCompleto, PedidoResponse
from src.schemas.pedido_detalhes import PedidoDetalhesResponse
from src.services.pedido_service import PedidoService


router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)


# Rota pública: criação de pedidos pelos clientes
@router.post("/", response_model=PedidoResponse, status_code=201)
def criar_pedido(
    dados: PedidoCreateCompleto,
    db: Session = Depends(get_db)
):
    try:
        return PedidoService.criar_pedido(db, dados)
    except ValueError as erro:
        raise HTTPException(status_code=400, detail=str(erro))


# Rota administrativa
@router.get("/{id_pedido}/detalhes", response_model=PedidoDetalhesResponse)
def buscar_detalhes_pedido(
    id_pedido: int,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    try:
        return PedidoService.buscar_detalhes(db, id_pedido)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro))


# Rota pública: consulta de pedido
@router.get("/{id_pedido}", response_model=PedidoResponse)
def buscar_pedido(
    id_pedido: int,
    db: Session = Depends(get_db)
):
    try:
        return PedidoService.buscar_pedido(db, id_pedido)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro))


# Rota de consulta de pedidos do cliente
@router.get("/usuario/{id_usuario}", response_model=list[PedidoResponse])
def listar_pedidos_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    return PedidoService.listar_pedidos_usuario(db, id_usuario)


# Rota administrativa
@router.get("/admin/todos", response_model=list[PedidoResponse])
def listar_todos_pedidos(
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    return PedidoService.listar_todos(db)


# Rota administrativa
@router.patch("/{id_pedido}/status", response_model=PedidoResponse)
def atualizar_status(
    id_pedido: int,
    novo_status: str,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    try:
        return PedidoService.atualizar_status(db, id_pedido, novo_status)
    except ValueError as erro:
        raise HTTPException(status_code=400, detail=str(erro))


# Rota administrativa
@router.patch("/{id_pedido}/pagamento")
def atualizar_status_pagamento(
    id_pedido: int,
    novo_status: str,
    db: Session = Depends(get_db),
    admin=Depends(obter_admin_atual)
):
    try:
        pagamento = PedidoService.atualizar_status_pagamento(
            db, id_pedido, novo_status
        )

        return {
            "id_pedido": pagamento.id_pedido,
            "forma_pagamento": pagamento.forma_pagamento,
            "status": pagamento.status
        }

    except ValueError as erro:
        raise HTTPException(status_code=400, detail=str(erro))
