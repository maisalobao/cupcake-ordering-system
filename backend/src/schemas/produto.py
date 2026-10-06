from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ProdutoBase(BaseModel):
    nome: str
    descricao: str | None = None
    preco: Decimal
    imagem_url: str | None = None
    ativo: bool = True


class ProdutoCreate(ProdutoBase):
    pass


class ProdutoResponse(ProdutoBase):
    id_produto: int

    model_config = ConfigDict(from_attributes=True)
