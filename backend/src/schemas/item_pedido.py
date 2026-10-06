from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ItemPedidoBase(BaseModel):
    id_produto: int
    quantidade: int
    preco_unitario: Decimal
    subtotal: Decimal


class ItemPedidoCreate(ItemPedidoBase):
    pass


class ItemPedidoResponse(ItemPedidoBase):
    id_item_pedido: int
    id_pedido: int

    model_config = ConfigDict(from_attributes=True)
