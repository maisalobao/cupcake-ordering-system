from pydantic import BaseModel, ConfigDict


class PagamentoBase(BaseModel):
    forma_pagamento: str
    status: str = "PENDENTE"


class PagamentoCreate(PagamentoBase):
    pass


class PagamentoResponse(PagamentoBase):
    id_pagamento: int
    id_pedido: int

    model_config = ConfigDict(from_attributes=True)
