from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ItemPedidoDetalhe(BaseModel):
    id_produto: int
    nome_produto: str
    quantidade: int
    preco_unitario: Decimal
    subtotal: Decimal


class EnderecoEntregaDetalhe(BaseModel):
    logradouro: str
    numero: str
    complemento: str | None = None
    bairro: str
    cidade: str
    estado: str
    cep: str


class PagamentoDetalhe(BaseModel):
    forma_pagamento: str
    status: str


class PedidoDetalhesResponse(BaseModel):
    id_pedido: int
    id_usuario: int
    valor_total: Decimal
    status: str
    itens: list[ItemPedidoDetalhe]
    endereco: EnderecoEntregaDetalhe
    pagamento: PagamentoDetalhe