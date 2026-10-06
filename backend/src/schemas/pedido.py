from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class PedidoBase(BaseModel):
    id_usuario: int
    valor_total: Decimal
    status: str = "RECEBIDO"


class PedidoCreate(PedidoBase):
    pass


class PedidoResponse(PedidoBase):
    id_pedido: int

    model_config = ConfigDict(from_attributes=True)
