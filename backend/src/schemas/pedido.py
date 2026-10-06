from src.schemas.item_pedido import ItemPedidoCreate
from src.schemas.endereco_entrega import EnderecoEntregaCreate
from src.schemas.pagamento import PagamentoCreate
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


class PedidoCreateCompleto(BaseModel):
    id_usuario: int
    itens: list[ItemPedidoCreate]
    endereco: EnderecoEntregaCreate
    pagamento: PagamentoCreate
