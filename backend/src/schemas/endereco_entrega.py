from pydantic import BaseModel, ConfigDict


class EnderecoEntregaBase(BaseModel):
    logradouro: str
    numero: str
    complemento: str | None = None
    bairro: str
    cidade: str
    estado: str
    cep: str


class EnderecoEntregaCreate(EnderecoEntregaBase):
    pass


class EnderecoEntregaResponse(EnderecoEntregaBase):
    id_endereco: int
    id_pedido: int

    model_config = ConfigDict(from_attributes=True)
